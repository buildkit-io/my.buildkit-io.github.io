/*globals angular */
angular.module("bkApp").controller('projectActionsController', ['$scope', 'tasksService', function($scope, tasksService) {

	$scope.refresh = function() {
        tasksService.listContainers($scope.project);
    };	

    $scope.startProject = function() {
        tasksService.startProject($scope.project);
    };

    $scope.restartProject = function() {
        tasksService.restartProject($scope.project);
    };

    $scope.stopProject = function() {
        tasksService.stopProject($scope.project);
    };

    $scope.deleteProject = function() {
        tasksService.deleteProject($scope.project);
    };

    $scope.canStart = function() {
        if (!$scope.project) {
            return false;
        }
        return $scope.project.status === Project.StatusTypes.STOPPED;
    };

    $scope.canStop = function() {
        if (!$scope.project) {
            return false;
        }
        return $scope.project.status === Project.StatusTypes.RUNNING;
    };

}]).directive('projectActions', function() {
    return {
        restrict: 'E',
        scope: {
            project: "="
        },
        controller: 'projectActionsController',
        templateUrl: 'app/projects/project-actions.html'
    };
});
