'use strict';
var socket = io.connect('/');
var htmlText = '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '  <head>\n' +
    '    <title>Jade</title>\n' +
    '    <script type="text/javascript">\n' +
    '      foo = true;\n' +
    '      bar = function () {};\n' +
    '      if (foo) {\n' +
    '        bar(1 + 5)\n' +
    '      }\n' +
    '    </script>\n' +
    '  </head>\n' +
    '  <body>\n' +
    '    <h1>Jade - node template engine</h1>\n' +
    '    <div id="container" class="col">\n' +
    '      <p>You are amazing</p>\n' +
    '      <p>Jade is a terse and simple\n' +
    '         templating language with a\n' +
    '         strong focus on performance\n' +
    '         and powerful features.</p>\n' +
    '    </div>\n' +
    '  </body>\n' +
    '</html>';
function getIndentWith() {
  return document.querySelector('input[name="indent-with"]:checked').value
}

function getWideOfIndent() {
  return document.querySelector('select[name="width-of-indent"]').value
}

var html2jadeModule, jade2htmlModule;
var activate = function (id, options) {
    var editor, s;
    editor = ace.edit(id);
    s = editor.getSession();
    editor.setTheme('ace/theme/xcode');
    if (options.type === "html") {
        editor.getSession().setMode("ace/mode/html");
    } else if (options.type === "jade") {
        editor.getSession().setMode("ace/mode/jade");
    }

    editor.getSession().setTabSize(getWideOfIndent());
    // editor.renderer.setShowInvisibles(true);
    editor.setFontSize("13px")

    if (getIndentWith() === 'tabs') {
      editor.getSession().setUseSoftTabs(false);
    } else {
      editor.getSession().setUseSoftTabs(true);
    }

    editor.renderer.setShowPrintMargin(false);
    editor.renderer.setHScrollBarAlwaysVisible(true);
    editor.renderer.setShowGutter(false);
    editor.setHighlightActiveLine(true);
    if (options.readonly) {
        editor.setReadOnly(true);
    }
    if (options.noActiveLine) {
        editor.setHighlightActiveLine(false);
    }
    return editor;
};

var isHtmlActivate, isJadeActivate, isJadeSetOnchange, isHtmlSetOnchange;
var activate_html2jade = function () {
    var htmlEditor = activate("html_editor", {
        type: "html"
    });

    var jadeEditor = activate("jade_editor", {
        type: "jade",
        noActiveLine: true
    });
    var onchange = function (e) {
      var action = e.data.action;

      if (isJadeActivate) {
          return false
      }
      var html = htmlEditor.getValue();
      convertHtml2Jade(html);
    };
    isJadeActivate = false;
    isHtmlActivate = true;
    if (!isHtmlSetOnchange) {
        isHtmlSetOnchange = true;
        htmlEditor.getSession().on("change", onchange);
    }
}

function findHTMLOrBodyTag (html) {
  return html.search(/<\/html>|<\/body>/) > -1
}

var activate_jade2html = function () {
    var jadeEditor = activate("jade_editor", {
        type: "jade"
    });
    var htmlOutput = activate("html_editor", {
        type: "html",
        noActiveLine: true
    });

    var onchange = function () {
        if (isHtmlActivate) {
            return false
        }
        var out,
            input = jadeEditor.getSession().getValue();

        socket.emit('edit jade', input);

    }
    isJadeActivate = true;
    isHtmlActivate = false;
    if (!isJadeSetOnchange) {
        isJadeSetOnchange = true;
        jadeEditor.getSession().on("change", onchange);
    }

}


function init() {
  var body;
  var htmlEditor = activate("html_editor", {
      type: "html"
  });

  var jadeEditor = activate("jade_editor", {
      type: "jade"
  });

  htmlEditor.getSession().setValue(htmlText);

  var html = htmlEditor.getSession().getValue();
  convertHtml2Jade(html);
  socket.on('html2jade', function (jade) {
    jadeEditor.getSession().setValue(jade);
  });
  socket.on('jade2html', function (jade) {
    if (jade.html) {
      htmlEditor.getSession().setValue(jade.html);
      $('.error').removeClass('show')
      $('.error').addClass('hide')
    }

    if (jade.error) {
      $('.error').addClass('show')
      $('.error').removeClass('hide')
      var error = jade.error.replace(/\n/g,'<br>');
      $('.error').html(error)
    }
  });

};


function convertHtml2Jade (html) {
  var hasHTMLOrBodyTag = findHTMLOrBodyTag(html);
  var options = {
    bodyless: !hasHTMLOrBodyTag,
    nspaces: getWideOfIndent()
  }
  options.tabs = getIndentWith() === 'tabs' ? true : false
  socket.emit('edit html', html, options);
}

init()


$("#html_editor textarea").on('focus', activate_html2jade);
$("#jade_editor textarea").on('focus', activate_jade2html);
