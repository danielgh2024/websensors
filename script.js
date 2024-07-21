let tasks = [];

function addTask() {
    const taskDiv = document.createElement('div');
    
    taskDiv.innerHTML = `
        <input type="text" placeholder="Task Name" class="taskName">
        <input type="datetime-local" placeholder="Start Date" class="startDate">
        <input type="datetime-local" placeholder="End Date" class="endDate">
        <select class="taskStatus">
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
        </select>
        <button onclick="generateGantt()">Generate Gantt Chart</button>
    `;
    
    document.getElementById('taskInputs').appendChild(taskDiv);
}

function generateGantt() {
    const taskInputs = document.querySelectorAll('#taskInputs div');
    tasks = [];
    
    taskInputs.forEach(input => {
        const taskName = input.querySelector('.taskName').value;
        const startDate = new Date(input.querySelector('.startDate').value);
        const endDate = new Date(input.querySelector('.endDate').value);
        const status = input.querySelector('.taskStatus').value;
        
        tasks.push({ taskName, startDate, endDate, status });
    });

    renderGanttChart(tasks);
}

function renderGanttChart(tasks) {
    document.getElementById('ganttChart').innerHTML = '';
    
    const taskNames = tasks.map(task => task.taskName);
    const taskStatus = { "ACTIVE": "green", "COMPLETED": "blue" };
    
    const svg = d3.select("#ganttChart")
        .append("svg")
        .attr("width", 800)
        .attr("height", 400);
    
    const xScale = d3.scaleTime()
        .domain([d3.min(tasks, d => d.startDate), d3.max(tasks, d => d.endDate)])
        .range([0, 800]);
    
    const yScale = d3.scaleBand()
        .domain(taskNames)
        .range([0, 400])
        .padding(0.1);
    
    svg.selectAll(".task")
        .data(tasks)
        .enter()
        .append("rect")
        .attr("class", "task")
        .attr("x", d => xScale(d.startDate))
        .attr("y", d => yScale(d.taskName))
        .attr("width", d => xScale(d.endDate) - xScale(d.startDate))
        .attr("height", yScale.bandwidth())
        .attr("fill", d => taskStatus[d.status]);
    
    svg.append("g")
        .attr("transform", "translate(0,400)")
        .call(d3.axisBottom(xScale));
    
    svg.append("g")
        .call(d3.axisLeft(yScale));
}

document.addEventListener('DOMContentLoaded', () => {
    addTask(); // Añade la primera fila de entrada al cargar la página
});
