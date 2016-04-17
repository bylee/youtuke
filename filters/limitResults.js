angular.module("youtukeApp.filters", [])
    .filter("limitResults", ["$filter", function ($filter) {
        return function (data, page, size) {
            if (angular.isArray(data) & angular.isNumber(page) && angular.isNumber(size)) {
                var startPage = (page - 1) * size;
                if (data.length < startPage) {
                    return [];
                } else {
                    return $filter("limitTo")(data, size, startPage);
                }
            } else {
                return data;
            }
        }
    }]).filter("resultCount", function () {
        return function (data, size) {
            if (angular.isArray(data)) {
                var result = [];
                for (var i = 0; i < Math.ceil(data.length / size); i++) {
                    result.push(i);
                }
                return result;
            } else {
                return data;
            }
        }
    });