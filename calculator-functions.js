// Calculator Functions 
function initCalculators() { 
    // Motor Power Calculator 
    const calculatePowerBtn = document.getElementById('calculate-power'); 
    if (calculatePowerBtn) { 
        calculatePowerBtn.addEventListener('click', calculateMotorPower); 
    } 
    
    // RPM and Torque Calculator 
    const calculateRpmTorqueBtn = document.getElementById('calculate-rpm-torque'); 
    if (calculateRpmTorqueBtn) { 
        calculateRpmTorqueBtn.addEventListener('click', calculateRpmAndTorque); 
    } 
    
    // Battery Calculator 
    const calculateBatteryBtn = document.getElementById('calculate-battery'); 
    if (calculateBatteryBtn) { 
        calculateBatteryBtn.addEventListener('click', calculateBatteryPerformance); 
    } 
} 

function calculateMotorPower() { 
    const weight = parseFloat(document.getElementById('vehicle-weight').value); 
    const acceleration = parseFloat(document.getElementById('acceleration').value); 
    const topSpeed = parseFloat(document.getElementById('top-speed').value); 
    const efficiency = parseFloat(document.getElementById('efficiency').value) / 100; 
    
    // Constants 
    const airDensity = 1.225; // kg/m³ 
    const dragCoefficient = 0.3; // Average for modern EVs 
    const frontalArea = 2.2; // m² 
    const rollingResistance = 0.01; // Coefficient 
    const gravity = 9.81; // m/s² 
    
    // Convert top speed to m/s 
    const speedMs = topSpeed / 3.6; 
    
    // Calculate power components 
    const powerAcceleration = weight * acceleration * speedMs; 
    const powerDrag = 0.5 * airDensity * dragCoefficient * frontalArea * Math.pow(speedMs, 3); 
    const powerRolling = rollingResistance * weight * gravity * speedMs; 
    
    // Total power required 
    const totalPowerWatts = (powerAcceleration + powerDrag + powerRolling) / efficiency; 
    const totalPowerKW = totalPowerWatts / 1000; 
    
    // Display results 
    document.getElementById('power-result').textContent = totalPowerKW.toFixed(2) + ' kW'; 
    
    // Recommend motor type based on power 
    let recommendation = ''; 
    if (totalPowerKW < 50) { 
        recommendation = 'AC Induction Motor (ACIM)'; 
    } else if (totalPowerKW < 150) { 
        recommendation = 'Permanent Magnet Synchronous Motor (PMSM)'; 
    } else { 
        recommendation = 'Dual Motor Setup (PMSM)'; 
    } 
    
    document.getElementById('motor-recommendation').textContent = recommendation; 
} 

function calculateRpmAndTorque() { 
    const motorPower = parseFloat(document.getElementById('motor-power').value); 
    const gearRatio = parseFloat(document.getElementById('gear-ratio').value); 
    const wheelDiameter = parseFloat(document.getElementById('wheel-diameter').value); 
    const vehicleSpeed = parseFloat(document.getElementById('vehicle-speed').value); 
    
    // Convert vehicle speed to m/s
    const speedMs = vehicleSpeed / 3.6;
    
    // Calculate motor RPM
    // Formula: RPM = (Speed in km/h × Gear Ratio × 336.13) ÷ Wheel Diameter in inches
    const motorRpm = (vehicleSpeed * gearRatio * 336.13) / wheelDiameter;
    
    // Calculate motor torque
    // Formula: Torque (Nm) = (Power (kW) × 9550) ÷ RPM
    const motorTorque = (motorPower * 9550) / motorRpm;
    
    // Calculate wheel torque
    const wheelTorque = motorTorque * gearRatio;
    
    // Display results
    document.getElementById('rpm-result').textContent = motorRpm.toFixed(0) + ' RPM';
    document.getElementById('torque-result').textContent = motorTorque.toFixed(2) + ' Nm';
    document.getElementById('wheel-torque-result').textContent = wheelTorque.toFixed(2) + ' Nm';
}

function calculateBatteryPerformance() {
    const batteryCapacity = parseFloat(document.getElementById('battery-capacity').value);
    const batteryVoltage = parseFloat(document.getElementById('battery-voltage').value);
    const chargerPower = parseFloat(document.getElementById('charger-power').value);
    const consumption = parseFloat(document.getElementById('vehicle-consumption').value);
    
    // Calculate battery capacity in Ah
    const capacityAh = (batteryCapacity * 1000) / batteryVoltage;
    
    // Calculate charging time (hours)
    const chargingTime = batteryCapacity / chargerPower;
    
    // Calculate range
    const range = (batteryCapacity * 100) / consumption;
    
    // Estimate energy density (assuming lithium-ion)
    const energyDensity = 250; // Wh/kg - typical for modern lithium-ion
    
    // Display results
    document.getElementById('capacity-ah-result').textContent = capacityAh.toFixed(1) + ' Ah';
    document.getElementById('charging-time-result').textContent = chargingTime.toFixed(2) + ' hours';
    document.getElementById('range-result').textContent = range.toFixed(0) + ' km';
    document.getElementById('energy-density-result').textContent = energyDensity + ' Wh/kg';
}