angular.module('daily').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/task-list.html',
    "<ul>\n" +
    "    <li ng-repeat=\"item in list\">\n" +
    "        <a href=\"{{getTaskUrl(item.id)}}\" target=\"_blank\">{{item.id}}</a> - {{stories[item.id]}}\n" +
    "        <div style=\"margin-left: 20px; font-style: italic\">{{item.comment}} <span style=\"color: red;font-weight: bold\" ng-if=\"item.person\"> - {{item.person}}</span></div>\n" +
    "    </li>\n" +
    "    <li ng-if=\"list.length == 0\">None</li>\n" +
    "</ul>"
  );


  $templateCache.put('pages/add.html',
    "<div class=\"container\">\n" +
    "    <form role=\"form\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"newReport\">Report JSON</label>\n" +
    "            <textarea class=\"form-control\" rows=\"3\" id=\"newReport\" ng-model=\"add.newReport\"><!-- for Tridion --></textarea>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <button type=\"submit\" class=\"btn btn-default\" ng-click=\"add.add();\">Add Report</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>"
  );


  $templateCache.put('pages/import.html',
    "<div class=\"container\">\n" +
    "    <form role=\"form\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label for=\"newReport\">Report JSON</label>\n" +
    "            <textarea class=\"form-control\" rows=\"3\" id=\"newReport\" ng-model=\"import.newReport\"><!-- for Tridion --></textarea>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <button type=\"submit\" class=\"btn btn-default\" ng-click=\"import.add();\">Import Report</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>"
  );


  $templateCache.put('pages/info.html',
    "<div class=\"container col-md-8\">\n" +
    "    <div>\n" +
    "        <select ng-model=\"info.result.info.name\" ng-options=\"name as name for (name, value) in info.team\"></select>\n" +
    "    </div>\n" +
    "    <h3>Blockers/Issues/Questions</h3>\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"item in info.result.blockers\">\n" +
    "                <a href=\"{{info.getTaskUrl(item.id)}}\" target=\"_blank\">#{{item.id}}</a> - {{info.stories[item.id]}}\n" +
    "                <a href=\"#\" class=\"btn btn-xs btn-danger\" ng-click=\"info.removeBlocker($index);\"><span style=\"font-size: 22px;line-height: 22px\" class=\"glyphicon glyphicon-minus\"></span> </a>\n" +
    "                <div style=\"margin-left: 20px; font-style: italic\">{{item.comment}} - <span style=\"color: red;font-weight: bold\">{{item.person}}</span> </div>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <input type=\"text\" placeholder=\"Story #\" ng-model=\"info.blocker.id\" size=\"20\">\n" +
    "                <input type=\"text\" placeholder=\"Comment\"  ng-model=\"info.blocker.comment\" size=\"70\">\n" +
    "                <input type=\"text\" placeholder=\"Blocking Person\"  ng-model=\"info.blocker.person\" size=\"14\">\n" +
    "                <a class=\"btn btn-xs btn-success\" ng-click=\"info.addBlocker();\"><span style=\"font-size: 22px;line-height: 22px\" class=\"glyphicon glyphicon-plus\"></span> </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    <h3>Worked on Today</h3>\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"item in info.result.today\">\n" +
    "            <a href=\"{{info.getTaskUrl(item.id)}}\" target=\"_blank\">#{{item.id}}</a> - {{info.stories[item.id]}}\n" +
    "            <a href=\"#\" class=\"btn btn-xs btn-danger\" ng-click=\"info.removeToday($index);\"><span style=\"font-size: 22px;line-height: 22px\" class=\"glyphicon glyphicon-minus\"></span> </a>\n" +
    "            <div style=\"margin-left: 20px; font-style: italic\">{{item.comment}}</div>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "            <input type=\"text\" placeholder=\"Story #\" ng-model=\"info.today.id\" size=\"20\">\n" +
    "            <input type=\"text\" placeholder=\"Comment\"  ng-model=\"info.today.comment\" size=\"70\">\n" +
    "            <a class=\"btn btn-xs btn-success\" ng-click=\"info.addToday();\"><span style=\"font-size: 22px;line-height: 22px\" class=\"glyphicon glyphicon-plus\"></span> </a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <h3>Planned for Tomorrow</h3>\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"item in info.result.tomorrow\">\n" +
    "            <a href=\"{{info.getTaskUrl(item.id)}}\" target=\"_blank\">#{{item.id}}</a> - {{info.stories[item.id]}}\n" +
    "            <a href=\"#\" class=\"btn btn-xs btn-danger\" ng-click=\"info.removeTomorrow($index);\"><span style=\"font-size: 22px;line-height: 22px\" class=\"glyphicon glyphicon-minus\"></span> </a>\n" +
    "            <div style=\"margin-left: 20px; font-style: italic\">{{item.comment}}</div>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "            <input type=\"text\" placeholder=\"Story #\" ng-model=\"info.tomorrow.id\" size=\"20\">\n" +
    "            <input type=\"text\" placeholder=\"Comment\"  ng-model=\"info.tomorrow.comment\" size=\"70\">\n" +
    "            <a class=\"btn btn-xs btn-success\" ng-click=\"info.addTomorrow();\"><span style=\"font-size: 22px;line-height: 22px\" class=\"glyphicon glyphicon-plus\"></span> </a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "<div class=\"container col-md-4 story-finder\">\n" +
    "    <h2>Task Finder</h2>\n" +
    "    <input type=\"text\" placeholder=\"Type to Filter\" ng-model=\"info.storiesFilterValue\" value=\"\">\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"(id, story) in info.stories | ObjectsFilter:info.storiesFilterValue\">{{id}} - {{story}}</li>\n" +
    "    </ul>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('pages/list.html',
    "<div class=\"container\">\n" +
    "    <h1>Exadel WEBDISNEY Team Status Report {{list.today}}</h1>\n" +
    "    <h3>List of Blockers</h3>\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"(story,comments) in list.blockers\">\n" +
    "            <a href=\"{{list.getTaskUrl(story)}}\" target=\"_blank\">{{story}}</a> - {{list.stories[story]}}\n" +
    "            <div style=\"margin-left: 20px; font-style: italic\" ng-repeat=\"item in comments\"><u>{{item.reporter}}</u>: {{item.comment}} - <span style=\"color: red;font-weight: bold\">{{item.person}}</span> </div>\n" +
    "        </li>\n" +
    "        <li ng-if=\"list.blockers.length == 0\">None</li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <hr>\n" +
    "\n" +
    "    <div ng-repeat=\"(name, report) in list.list\">\n" +
    "        <h3 ng-click=\"list.toOOO(name)\">{{name}}</h3>\n" +
    "        <div ng-if=\"report.info\">\n" +
    "            <h5>Blockers/Issues/Questions</h5>\n" +
    "            <div task-list list=\"report.blockers\"></div>\n" +
    "\n" +
    "            <h5>Worked on Today</h5>\n" +
    "            <div task-list list=\"report.today\"></div>\n" +
    "\n" +
    "            <h5>Planned for Tomorrow</h5>\n" +
    "            <div task-list list=\"report.tomorrow\"></div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"!report.info\" class=\"no-report\">\n" +
    "            <div ng-if=\"!report.ooo\" ng-click=\"list.toOOO(name)\" class=\"missing\" title=\"Click to switch to OOO\">Missing report</div>\n" +
    "            <div ng-if=\"report.ooo\" ng-click=\"list.fromOOO(name)\" title=\"Click to switch to Missing report\">Out Of Office</div>\n" +
    "        </div>\n" +
    "        <hr>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('pages/preview.html',
    "<div class=\"container\">\n" +
    "    <h1>{{preview.result.info.name}}</h1>\n" +
    "    <h3>Blockers/Issues/Questions</h3>\n" +
    "    <div task-list list=\"preview.result.blockers\"></div>\n" +
    "\n" +
    "    <h3>Worked on Today</h3>\n" +
    "    <div task-list list=\"preview.result.today\"></div>\n" +
    "\n" +
    "    <h3>Planned for Tomorrow</h3>\n" +
    "    <div task-list list=\"preview.result.tomorrow\"></div>\n" +
    "\n" +
    "    <a class=\"btn btn-success\" ng-click=\"preview.sendReport();\">Save</a>\n" +
    "    <!--<a class=\"btn btn-success\" ng-click=\"preview.showCode();\">Show Json Code</a>-->\n" +
    "    <br>\n" +
    "    <div>{{preview.reportContent}}</div>\n" +
    "</div>"
  );

}]);
