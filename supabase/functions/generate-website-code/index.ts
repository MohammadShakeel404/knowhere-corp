
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectId, projectData } = await req.json();

    // Generate project structure and code using OpenAI
    const generatedCode = await generateProjectCode(projectData);

    // Save files to database
    await saveProjectFiles(projectId, generatedCode.files);

    return new Response(JSON.stringify({ 
      success: true,
      generatedCode 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-website-code function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateProjectCode(projectData: any) {
  const prompt = createCodeGenerationPrompt(projectData);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert web developer. Generate complete, production-ready code for web projects. Always include proper file structure, responsive design, and modern best practices.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const generatedContent = data.choices[0].message.content;

  // Parse the generated content to extract individual files
  return parseGeneratedCode(generatedContent, projectData);
}

function createCodeGenerationPrompt(projectData: any) {
  const { name, description, project_type, requirements, branding_data } = projectData;

  return `
Generate a complete ${project_type} project with the following specifications:

Project Name: ${name}
Description: ${description}
Type: ${project_type}

Requirements:
- Industry: ${requirements.industry || 'General'}
- Target Audience: ${requirements.target_audience || 'General public'}
- Features: ${requirements.features?.join(', ') || 'Basic functionality'}
- Design Preferences: ${requirements.design_preferences || 'Modern and clean'}
- Tech Preferences: ${requirements.tech_preferences || 'HTML, CSS, JavaScript'}

${branding_data ? `Branding:
- Color Scheme: ${branding_data.color_scheme}` : ''}

Generate a complete project with:
1. HTML files (index.html and any additional pages)
2. CSS files (responsive, modern styling)
3. JavaScript files (interactive functionality)
4. Any additional assets needed

Please structure your response as follows:
[FILE: filename.ext]
(file content here)
[/FILE]

Make sure to:
- Use modern HTML5 semantic elements
- Include responsive CSS with mobile-first design
- Add interactive JavaScript where appropriate
- Follow accessibility best practices
- Include proper meta tags and SEO optimization
- Use the specified color scheme and branding if provided
- Implement all requested features
`;
}

function parseGeneratedCode(content: string, projectData: any) {
  const files: any[] = [];
  const fileRegex = /\[FILE:\s*([^\]]+)\]\s*([\s\S]*?)\s*\[\/FILE\]/g;
  
  let match;
  while ((match = fileRegex.exec(content)) !== null) {
    const [, filePath, fileContent] = match;
    const fileExtension = filePath.split('.').pop()?.toLowerCase() || 'txt';
    
    files.push({
      file_path: filePath.trim(),
      file_content: fileContent.trim(),
      file_type: fileExtension
    });
  }

  // If no files were parsed, create a basic structure
  if (files.length === 0) {
    files.push(...createBasicProjectStructure(projectData));
  }

  return {
    files,
    structure: generateProjectStructure(files),
    metadata: {
      generated_at: new Date().toISOString(),
      project_type: projectData.project_type,
      total_files: files.length
    }
  };
}

function createBasicProjectStructure(projectData: any) {
  const { name, requirements, branding_data } = projectData;
  const colorScheme = branding_data?.color_scheme || '#3B82F6, #1E40AF';
  
  return [
    {
      file_path: 'index.html',
      file_content: generateBasicHTML(name, requirements, colorScheme),
      file_type: 'html'
    },
    {
      file_path: 'styles.css',
      file_content: generateBasicCSS(colorScheme),
      file_type: 'css'
    },
    {
      file_path: 'script.js',
      file_content: generateBasicJS(),
      file_type: 'js'
    }
  ];
}

function generateBasicHTML(projectName: string, requirements: any, colorScheme: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="container">
                <h1>${projectName}</h1>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <div class="container">
                <h2>Welcome to ${projectName}</h2>
                <p>${requirements.industry ? `Your trusted ${requirements.industry.toLowerCase()} solution` : 'Building amazing experiences'}</p>
                <button class="cta-button">Get Started</button>
            </div>
        </section>

        <section id="about" class="section">
            <div class="container">
                <h2>About Us</h2>
                <p>We specialize in providing excellent services to ${requirements.target_audience || 'our valued customers'}.</p>
            </div>
        </section>

        <section id="services" class="section">
            <div class="container">
                <h2>Our Services</h2>
                <div class="services-grid">
                    ${requirements.features?.map((feature: string) => `
                    <div class="service-card">
                        <h3>${feature}</h3>
                        <p>Professional ${feature.toLowerCase()} services tailored to your needs.</p>
                    </div>
                    `).join('') || '<div class="service-card"><h3>Premium Service</h3><p>High-quality solutions for your business.</p></div>'}
                </div>
            </div>
        </section>

        <section id="contact" class="section">
            <div class="container">
                <h2>Contact Us</h2>
                <form class="contact-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2024 ${projectName}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
}

function generateBasicCSS(colorScheme: string) {
  const colors = colorScheme.split(',').map(c => c.trim());
  const primaryColor = colors[0] || '#3B82F6';
  const secondaryColor = colors[1] || '#1E40AF';

  return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header {
    background: ${primaryColor};
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

nav a:hover {
    opacity: 0.8;
}

main {
    margin-top: 80px;
}

.hero {
    background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
    color: white;
    padding: 4rem 0;
    text-align: center;
}

.hero h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.cta-button {
    background: white;
    color: ${primaryColor};
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.3s;
}

.cta-button:hover {
    transform: translateY(-2px);
}

.section {
    padding: 4rem 0;
}

.section:nth-child(even) {
    background: #f8f9fa;
}

.section h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    color: ${primaryColor};
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.service-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.3s;
}

.service-card:hover {
    transform: translateY(-5px);
}

.contact-form {
    max-width: 600px;
    margin: 0 auto;
    display: grid;
    gap: 1rem;
}

.contact-form input,
.contact-form textarea {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

.contact-form button {
    background: ${primaryColor};
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background 0.3s;
}

.contact-form button:hover {
    background: ${secondaryColor};
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem 0;
}

@media (max-width: 768px) {
    nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    nav ul {
        gap: 1rem;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
    
    .services-grid {
        grid-template-columns: 1fr;
    }
}`;
}

function generateBasicJS() {
  return `// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(59, 130, 246, 0.95)';
    } else {
        header.style.background = '#3B82F6';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});`;
}

function generateProjectStructure(files: any[]) {
  return files.map(file => ({
    path: file.file_path,
    type: file.file_type,
    size: file.file_content.length
  }));
}

async function saveProjectFiles(projectId: string, files: any[]) {
  for (const file of files) {
    const { error } = await supabase
      .from('project_files')
      .upsert({
        project_id: projectId,
        file_path: file.file_path,
        file_content: file.file_content,
        file_type: file.file_type
      });

    if (error) {
      console.error('Error saving file:', file.file_path, error);
      throw error;
    }
  }
}
