# Baseline

Display display baseline below a task.

## Usage

    angular.module('myApp', ['gantt', 'gantt.line']);
    
<!-- -->

    <div gantt>
        <gantt-task-line enabled="..."></gantt-task-line>
    </div>

<!-- -->

    <link rel="stylesheet" href="angular-gantt-line-plugin.css">

To define line on a task, you need to add  `from` and `to` property on task base object model.

    {
      name: "...",
      from: <Date>,
      to: <Date>,
      base: {
        from: '<Date>', // force from date to this value
        to: '<Date>' // force to date to this value
        color: <String>
        classes: <String> || <Array>
      }
    }


## Attributes

- ### enabled

    Enable display of baseline.
  
    default: `true`

- ### template
 
    Template to use for baseline element.
     
    This attribute is not observed and not evaluated as an expression.

- ### template-url

    URL of template to use for baseline element.

    If `undefined` or `plugins/line/taskLine.tmpl.html`, default template will be used.

    This attribute is not observed and not evaluated as an expression.
    
    *note: template-url must be different than `plugins/line/taskLine.tmpl.html`, or it will use default
    template included in `angular-gantt-plugins.js` or `angular-gantt-line-plugin.js`.*
