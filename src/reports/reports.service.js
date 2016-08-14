(function () {
    'use strict';
    angular.module('app.reports')
        .service('ReportsService', ReportsService);
    ReportsService.$inject = ['vendors'];
    function ReportsService(vendors) {
        var reports = this;
        reports.properties = {
            visitorColor: '#ffcccc',
            facultyColor: '#cceeff',
            studentColor: '#ffddcc'
        };
        reports.getPersonType = getPersonType;
        reports.createBarChart = createBarChart;
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
                backgroundColor.push(vendors.color2color(reports.properties.visitorColor, 'rgba'));
            }
            if (data.faculty) {
                labels.push('Faculty');
                chartData.push(data.faculty);
                backgroundColor.push(vendors.color2color(reports.properties.facultyColor, 'rgba'));
            }
            if (data.student) {
                labels.push('Student');
                chartData.push(data.student);
                backgroundColor.push(vendors.color2color(reports.properties.studentColor, 'rgba'));
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
                chart.update()
            }

            return chart;
        }
    }
})();