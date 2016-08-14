(function () {
    'use strict';
    angular.module('app.reports')
        .service('ReportsService', ReportsService);
    ReportsService.$inject = ['vendors', 'AVAILABLE_LABELS'];
    function ReportsService(vendors, AVAILABLE_LABELS) {
        var reports = this;
        reports.properties = {
            visitorColor: '#ffcccc',
            facultyColor: '#cceeff',
            studentColor: '#ffddcc'
        };
        reports.getPersonType = getPersonType;
        reports.createBarChart = createBarChart;
        reports.destroyChart = destroyChart;
        reports.createLineChart = createLineChart;
        reports.exportData = {};
        reports.isLoading = false;
        var chart;
        function getPersonType() {
            var personType = [];
            var count = 0;
            if (reports.properties.isVisitor) {
                personType.push('Visitor');
            }
            if (reports.properties.isFaculty) {
                personType.push('faculty');
            }
            if (reports.properties.isStudent) {
                personType.push('student');
            }
            return personType;
        }
        function createBarChart(data) {
            var labels = [];
            var chartData = [];
            var backgroundColor = [];
            if (data.Visitor) {
                labels.push('Visitor');
                chartData.push(data.Visitor);
                backgroundColor.push(reports.properties.visitorColor);
            }
            if (data.faculty) {
                labels.push('Faculty');
                chartData.push(data.faculty);
                backgroundColor.push(reports.properties.facultyColor);
            }
            if (data.student) {
                labels.push('Student');
                chartData.push(data.student);
                backgroundColor.push(reports.properties.studentColor);
            }
            if (!chart) {
                chart = new vendors.Chart(vendors.jQuery('#reportsBarCart'), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: reports.properties.chartLabel,
                            data: chartData,
                            backgroundColor: backgroundColor
                        }]
                    }
                });
            } else {
                chart.data.labels = labels;
                chart.data.datasets[0] = {
                    label: reports.properties.chartLabel,
                    data: chartData,
                    backgroundColor: backgroundColor
                };
                chart.update();
            }

            return chart;
        }
        function createLineChartData(data) {
            var labelSize = 0;
            var datasets = [];
            if (data.Visitor) {
                labelSize = data.Visitor.length;
                var visitorData = {};
                visitorData.label = 'Visitor';
                visitorData.data = data.Visitor;
                visitorData.fill = false;
                visitorData.borderColor = reports.properties.visitorColor;
                visitorData.pointBorderColor = reports.properties.visitorColor;
                visitorData.pointBackgroundColor = reports.properties.visitorColor;
                datasets.push(visitorData);
            }
            if (data.faculty) {
                if (labelSize < data.faculty.length) {
                    labelSize = data.faculty.length;
                }
                var facultyData = {};
                facultyData.label = 'Faculty';
                facultyData.data = data.faculty;
                facultyData.fill = false;
                facultyData.borderColor = reports.properties.facultyColor;
                facultyData.pointBorderColor = reports.properties.facultyColor;
                facultyData.pointBackgroundColor = reports.properties.facultyColor;
                datasets.push(facultyData);
            }
            if (data.student) {
                if (labelSize < data.student.length) {
                    labelSize = data.student.length;
                }
                var studentData = {};
                studentData.label = 'Student';
                studentData.data = data.student;
                studentData.fill = false;
                studentData.borderColor = reports.properties.studentColor;
                studentData.pointBorderColor = reports.properties.studentColor;
                studentData.pointBackgroundColor = reports.properties.studentColor;
                datasets.push(studentData);
            }
            var labels = AVAILABLE_LABELS.slice(0, labelSize);
            return {
                labels: labels,
                datasets: datasets
            };
        }
        function createLineChart(data) {

            var lineChartData = createLineChartData(data);


            if (!chart) {
                chart = new vendors.Chart(vendors.jQuery('#reportsLineCart'), {
                    type: 'line',
                    data: {
                        labels: lineChartData.labels,
                        datasets: lineChartData.datasets
                    }
                });
            } else {
                chart.data.labels = lineChartData.labels;
                chart.data.datasets = lineChartData.datasets;
                chart.update();
            }
        }

        function destroyChart() {
            if (chart) {
                chart.destroy();
                chart = undefined;
            }
        }
    }
})();