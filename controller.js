"use strict";

var app = angular.module('myApp', [ 'googlechart' ]);

app.controller('ElectionCtrl', function($scope,$http) {


    //Chart Votes
    var chartVotes = {};
    chartVotes.type = "PieChart";
    chartVotes.data = [];
    chartVotes.data = [['Parti', 'Votes']];
    chartVotes.options = {
        displayExactValues: true,
        width: 1000,
        height: 400,
        is3D: true,
        chartArea: {left:10,top:10,bottom:0,height:"100%"}
    };
    chartVotes.formatters = {
      number : [{
        columnNum: 1,
        pattern: "#,##0 votes"
      }]
    };

    $scope.chartVotes = chartVotes;
    
    //Chart Participations
    var chartParticipations = {};
    chartParticipations.type = "PieChart";
    chartParticipations.data = [['Participations', 'Personnes']];
    chartParticipations.options ={
        displayExactValues: true,
        width: 1000,
        height: 400,
        is3D: true,
        chartArea: {left:10,top:10,bottom:0,height:"100%"}
    };
    chartParticipations.formatters = {
      number : [{
        columnNum: 1,
        pattern: "#,##0 personnes"
      }]
    };

    $scope.chartParticipations = chartParticipations;

    //Loading data..

    //The evil global function is needed because the callback is constant..
    window.callback = function (res) {
        console.info(res);
        var partis = res.statistiques.partisPolitiques;
        var stats = res.statistiques;

        //Data for the votes chart (1rst one)
        for (var i=0; i<partis.length; i++) {
            chartVotes.data.push([partis[i]['nomPartiPolitique'],partis[i]['nbVoteTotal']]);
        }

        chartVotes.data.push(["Votes annul\u00E9s/rejet\u00E9s",stats.nbVoteRejete]);
        var didNotVote = stats.nbElecteurInscrit-stats.nbVoteExerce;
        chartVotes.data.push(["N\'a pas vot\u00E9",didNotVote]);

        //Data for the participation chart (2nd one)
        chartParticipations.data.push(['Votes exerc\u00E9s',stats.nbVoteValide]);
        chartParticipations.data.push(['Votes annul\u00E9s/rejet\u00E9s',stats.nbVoteRejete]);
        chartParticipations.data.push(['N\'a pas vot\u00E9',didNotVote]);

    }
  
    $http.jsonp("https://dgeq.org/resultats.js");
});

