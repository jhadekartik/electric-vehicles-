// Motor Type Animations 
function initMotorTypeAnimations() { 
    createPMSMAnimation(document.querySelector('#pmsm-animation')); 
    createACIMAnimation(document.querySelector('#acim-animation')); 
    createSRMAnimation(document.querySelector('#srm-animation')); 
} 

function createPMSMAnimation(container) { 
    if (!container) return; 
    
    const motor = document.createElement('div'); 
    motor.style.width = '60%'; 
    motor.style.height = '60%'; 
    motor.style.backgroundColor = '#2196F3'; 
    motor.style.position = 'absolute'; 
    motor.style.top = '50%'; 
    motor.style.left = '50%'; 
    motor.style.transform = 'translate(-50%, -50%)'; 
    motor.style.borderRadius = '50%'; 
    motor.style.overflow = 'hidden'; 
    container.appendChild(motor); 
    
    // Add stator 
    const stator = document.createElement('div'); 
    stator.style.width = '100%'; 
    stator.style.height = '100%'; 
    stator.style.border = '10px solid #1565C0'; 
    stator.style.borderRadius = '50%'; 
    stator.style.boxSizing = 'border-box'; 
    motor.appendChild(stator); 
    
    // Add rotor with magnets 
    const rotor = document.createElement('div'); 
    rotor.style.width = '60%'; 
    rotor.style.height = '60%'; 
    rotor.style.backgroundColor = '#90CAF9'; 
    rotor.style.position = 'absolute'; 
    rotor.style.top = '50%'; 
    rotor.style.left = '50%'; 
    rotor.style.transform = 'translate(-50%, -50%)'; 
    rotor.style.borderRadius = '50%'; 
    rotor.style.animation = 'spin 3s infinite linear'; 
    motor.appendChild(rotor); 
    
    // Add permanent magnets 
    for (let i = 0; i < 4; i++) { 
        const magnet = document.createElement('div'); 
        magnet.style.width = '40%'; 
        magnet.style.height = '20%'; 
        magnet.style.position = 'absolute'; 
        magnet.style.top = '40%'; 
        magnet.style.left = '30%'; 
        magnet.style.transform = `rotate(${i * 90}deg)`; 
        magnet.style.transformOrigin = '50% 50%'; 
        
        // North pole 
        const northPole = document.createElement('div'); 
        northPole.style.width = '50%'; 
        northPole.style.height = '100%'; 
        northPole.style.backgroundColor = '#F44336'; 
        northPole.style.float = 'left'; 
        magnet.appendChild(northPole); 
        
        // South pole 
        const southPole = document.createElement('div'); 
        southPole.style.width = '50%'; 
        southPole.style.height = '100%'; 
        southPole.style.backgroundColor = '#2196F3'; 
        southPole.style.float = 'left'; 
        magnet.appendChild(southPole); 
        
        rotor.appendChild(magnet); 
    } 
    
    // Add label 
    const label = document.createElement('div'); 
    label.textContent = 'Permanent Magnets'; 
    label.style.position = 'absolute'; 
    label.style.bottom = '10px'; 
    label.style.left = '50%'; 
    label.style.transform = 'translateX(-50%)'; 
    label.style.backgroundColor = 'rgba(255,255,255,0.8)'; 
    label.style.padding = '2px 5px'; 
    label.style.borderRadius = '3px'; 
    label.style.fontSize = '12px'; 
    container.appendChild(label); 
} 

// Create ACIM Animation
function createACIMAnimation(container) {
    if (!container) return;
    
    const motor = document.createElement('div');
    motor.style.width = '60%';
    motor.style.height = '60%';
    motor.style.backgroundColor = '#2196F3';
    motor.style.position = 'absolute';
    motor.style.top = '50%';
    motor.style.left = '50%';
    motor.style.transform = 'translate(-50%, -50%)';
    motor.style.borderRadius = '50%';
    motor.style.overflow = 'hidden';
    container.appendChild(motor);
    
    // Add stator with windings
    const stator = document.createElement('div');
    stator.style.width = '100%';
    stator.style.height = '100%';
    stator.style.border = '10px solid #1565C0';
    stator.style.borderRadius = '50%';
    stator.style.boxSizing = 'border-box';
    motor.appendChild(stator);
    
    // Add stator windings
    for (let i = 0; i < 6; i++) {
        const winding = document.createElement('div');
        winding.style.width = '15%';
        winding.style.height = '30%';
        winding.style.backgroundColor = '#FF9800';
        winding.style.position = 'absolute';
        winding.style.top = '10%';
        winding.style.left = '42.5%';
        winding.style.transform = `rotate(${i * 60}deg)`;
        winding.style.transformOrigin = '50% 130%';
        stator.appendChild(winding);
    }
    
    // Add rotor
    const rotor = document.createElement('div');
    rotor.style.width = '50%';
    rotor.style.height = '50%';
    rotor.style.backgroundColor = '#90CAF9';
    rotor.style.position = 'absolute';
    rotor.style.top = '50%';
    rotor.style.left = '50%';
    rotor.style.transform = 'translate(-50%, -50%)';
    rotor.style.borderRadius = '50%';
    rotor.style.animation = 'spin 3s infinite linear';
    motor.appendChild(rotor);
    
    // Add rotor bars
    for (let i = 0; i < 8; i++) {
        const bar = document.createElement('div');
        bar.style.width = '80%';
        bar.style.height = '5%';
        bar.style.backgroundColor = '#E65100';
        bar.style.position = 'absolute';
        bar.style.top = '47.5%';
        bar.style.left = '10%';
        bar.style.transform = `rotate(${i * 45}deg)`;
        rotor.appendChild(bar);
    }
    
    // Add label
    const label = document.createElement('div');
    label.textContent = 'Induction Motor';
    label.style.position = 'absolute';
    label.style.bottom = '10px';
    label.style.left = '50%';
    label.style.transform = 'translateX(-50%)';
    label.style.backgroundColor = 'rgba(255,255,255,0.8)';
    label.style.padding = '2px 5px';
    label.style.borderRadius = '3px';
    label.style.fontSize = '12px';
    container.appendChild(label);
}

// Create SRM Animation
function createSRMAnimation(container) {
    if (!container) return;
    
    const motor = document.createElement('div');
    motor.style.width = '60%';
    motor.style.height = '60%';
    motor.style.backgroundColor = '#2196F3';
    motor.style.position = 'absolute';
    motor.style.top = '50%';
    motor.style.left = '50%';
    motor.style.transform = 'translate(-50%, -50%)';
    motor.style.borderRadius = '50%';
    motor.style.overflow = 'hidden';
    container.appendChild(motor);
    
    // Add stator with poles
    const stator = document.createElement('div');
    stator.style.width = '100%';
    stator.style.height = '100%';
    stator.style.border = '10px solid #1565C0';
    stator.style.borderRadius = '50%';
    stator.style.boxSizing = 'border-box';
    motor.appendChild(stator);
    
    // Add stator poles
    for (let i = 0; i < 6; i++) {
        const pole = document.createElement('div');
        pole.style.width = '20%';
        pole.style.height = '25%';
        pole.style.backgroundColor = '#1565C0';
        pole.style.position = 'absolute';
        pole.style.top = '37.5%';
        pole.style.left = '40%';
        pole.style.transform = `rotate(${i * 60}deg)`;
        pole.style.transformOrigin = '50% 200%';
        stator.appendChild(pole);
    }
    
    // Add rotor
    const rotor = document.createElement('div');
    rotor.style.width = '40%';
    rotor.style.height = '40%';
    rotor.style.backgroundColor = '#90CAF9';
    rotor.style.position = 'absolute';
    rotor.style.top = '50%';
    rotor.style.left = '50%';
    rotor.style.transform = 'translate(-50%, -50%)';
    rotor.style.borderRadius = '50%';
    rotor.style.animation = 'spin 4s infinite linear';
    motor.appendChild(rotor);
    
    // Add rotor poles
    for (let i = 0; i < 4; i++) {
        const pole = document.createElement('div');
        pole.style.width = '25%';
        pole.style.height = '80%';
        pole.style.backgroundColor = '#64B5F6';
        pole.style.position = 'absolute';
        pole.style.top = '10%';
        pole.style.left = '37.5%';
        pole.style.transform = `rotate(${i * 90}deg)`;
        pole.style.transformOrigin = '50% 50%';
        rotor.appendChild(pole);
    }
    
    // Add label
    const label = document.createElement('div');
    label.textContent = 'Switched Reluctance';
    label.style.position = 'absolute';
    label.style.bottom = '10px';
    label.style.left = '50%';
    label.style.transform = 'translateX(-50%)';
    label.style.backgroundColor = 'rgba(255,255,255,0.8)';
    label.style.padding = '2px 5px';
    label.style.borderRadius = '3px';
    label.style.fontSize = '12px';
    container.appendChild(label);
}