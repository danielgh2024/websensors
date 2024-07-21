// Inicializar Blockly
var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox')
});

// Crear un toolbox (esto puede estar en el HTML o en un string en JS)
var toolbox = `
    <xml id="toolbox" style="display: none">
        <block type="controls_repeat_ext"></block>
        <block type="logic_compare"></block>
        <block type="math_number">
            <field name="NUM">123</field>
        </block>
        <block type="text"></block>
        <block type="text_print"></block>
    </xml>
`;

// Función para convertir bloques a JSON y luego a un diagrama de Gantt
function generateGanttFromBlocks() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var json = Blockly.Xml.domToText(xml);
    console.log(json); // Aquí se debería procesar el JSON para crear el diagrama de Gantt
    
    // Crear el diagrama de Gantt con D3.js
    var tasks = [
        { startDate: new Date("2023-07-01"), endDate: new Date("2023-07-05"), taskName: "Task 1", status: "ACTIVE" },
        { startDate: new Date("2023-07-05"), endDate: new Date("2023-07-10"), taskName: "Task 2", status: "COMPLETED" },
    ];
    
    var gantt = d3.gantt().taskTypes(["Task 1", "Task 2"]).taskStatus({ ACTIVE: "green", COMPLETED: "blue" });
    gantt(tasks);
}

// D3 Gantt Chart function (simplificado)
d3.gantt = function() {
    var taskTypes = [];
    var taskStatus = {};

    function gantt(tasks) {
        var width = 600;
        var height = 480;

        var svg = d3.select("#ganttChart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Escalas y ejes
        var xScale = d3.scaleTime().domain([d3.min(tasks, d => d.startDate), d3.max(tasks, d => d.endDate)]).range([0, width]);
        var yScale = d3.scaleBand().domain(taskTypes).range([0, height]);

        // Añadir tareas
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

        // Añadir ejes
        svg.append("g").call(d3.axisBottom(xScale));
        svg.append("g").call(d3.axisLeft(yScale));
    }

    gantt.taskTypes = function(value) {
        if (!arguments.length) return taskTypes;
        taskTypes = value;
        return gantt;
    };

    gantt.taskStatus = function(value) {
        if (!arguments.length) return taskStatus;
        taskStatus = value;
        return gantt;
    };

    return gantt;
};
