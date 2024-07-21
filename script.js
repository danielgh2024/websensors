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

// Añadir un botón para generar el diagrama de Gantt
var btn = document.createElement('button');
btn.innerText = 'Generate Gantt Chart';
btn.onclick = generateGanttFromBlocks;
document.body.appendChild(btn);
