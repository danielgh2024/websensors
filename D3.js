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
