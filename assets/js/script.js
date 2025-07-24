$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // Contact form submission
    $("#contact-form").submit(function (event) {
        event.preventDefault(); 

        emailjs.init("mnsTn8TF6ZCF53GGi"); 

        emailjs.sendForm('service_jqo6ika', 'template_qdm0pgl', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
    });
});

// Page visibility change for title
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | NOUIH Omar";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// Fixed Typed.js initialization
// Fetch data function with error handling
async function fetchData(type = "skills") {
    try {
        let response;
        if (type === "skills") {
            response = await fetch("skills.json");
        } else {
            response = await fetch("./projects/projects.json");
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        // Return fallback data if fetch fails
        if (type === "skills") {
            return [
                {name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"},
                {name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"},
                {name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"}
            ];
        } else {
            return [
                {
                    name: "Sample Project",
                    desc: "This is a sample project",
                    image: "default",
                    category: "web",
                    links: {view: "#", code: "#"}
                }
            ];
        }
    }
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) {
        console.error("Skills container not found");
        return;
    }
    
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer) {
        console.error("Projects container not found");
        return;
    }
    
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`;
    });
    projectsContainer.innerHTML = projectHTML;

    // Initialize tilt effect if VanillaTilt is available
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });
    }

    // Initialize ScrollReveal if available
    if (typeof ScrollReveal !== 'undefined') {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });
        srtop.reveal('.work .box', { interval: 200 });
    }
}

// Load skills and projects
fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// Initialize tilt effect
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
}

// Disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// ScrollReveal animations
if (typeof ScrollReveal !== 'undefined') {
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.home .content h3', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });

    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .linkedin', { interval: 600 });
    srtop.reveal('.home .github', { interval: 800 });
    srtop.reveal('.home .twitter', { interval: 1000 });
    srtop.reveal('.home .telegram', { interval: 600 });
    srtop.reveal('.home .instagram', { interval: 600 });
    srtop.reveal('.home .dev', { interval: 600 });

    srtop.reveal('.about .content h3', { delay: 200 });
    srtop.reveal('.about .content .tag', { delay: 200 });
    srtop.reveal('.about .content p', { delay: 200 });
    srtop.reveal('.about .content .box-container', { delay: 200 });
    srtop.reveal('.about .content .resumebtn', { delay: 200 });

    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { delay: 400 });

    srtop.reveal('.education .box', { interval: 200 });
    srtop.reveal('.work .box', { interval: 200 });
    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 400 });
    srtop.reveal('.contact .container', { delay: 400 });
    srtop.reveal('.contact .container .form-group', { delay: 400 });
}

// Intersection Observer for headings
(function(){
    const headings = document.querySelectorAll('section .heading');
    if(!headings.length) return;

    const obs = new IntersectionObserver((entries)=>{
        entries.forEach(ent=>{
            if(ent.isIntersecting){
                ent.target.classList.add('is-visible');
                obs.unobserve(ent.target);
            }
        });
    },{
        root:null,
        threshold:.4,
        rootMargin:"0px 0px -20% 0px"
    });

    headings.forEach(h=>obs.observe(h));
})();