function login() {
  var username = $("#username").val();
  var password = $("#password").val();
  if (username == "" || password == "") {
    return;
  }
  $.post("/login", { username: username, password: SparkMD5.hash(password + username) }, function (res) {
    console.log(res);
    if (res.success) {
      location.reload();
    } else {
      $("#mdui-textfield-password").addClass("mdui-textfield-invalid");
      $("#password-error").html(res.message);
    }
  });
}

// function logout() {
//   document.cookie = "access-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   location.reload();
// }

function rerender() {
  hljs.highlightAll();
  renderMathInElement($("body")[0], {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\[", right: "\\]", display: true },
      { left: "\\(", right: "\\)", display: false },
    ],
    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    ignoredClasses: ["nokatex"],
  });
}

function switch_choice() {
  var choice = $("#switch_choice").val();
  if (choice == "") {
    return;
  }
  var choice = Number(choice);
  $.get("/api/switch_choice", { choice: choice }, function (res) {
    if (res.success) {
      location = "/gym";
    } else {
      mdui.snackbar({
        message: res.message,
        timeout: 2000,
      });
      setTimeout(function () {
        location.reload(true);
      }, 2000);
    }
  });
}

function locked_problem() {
  mdui.snackbar({
    message: "The problem has not been unlocked",
    timeout: 2000,
  });
}

function decorate_button(btn) {
  btn.classList.add("mdui-btn");
  btn.classList.add("mdui-ripple");
  btn.classList.add("mdui-color-theme-accent");
}

function decorate_buttons() {
  var add_buttons = $("button.json-editor-btntype-add");
  for (var i = 0; i < add_buttons.length; i++) {
    var button = add_buttons[i];
    if(button.classList.contains("mdui-btn")) continue;
    decorate_button(button);
    button.innerHTML = "NEW";
  }
  var delete_last_buttons = $("button.json-editor-btntype-deletelast");
  for (var i = 0; i < delete_last_buttons.length; i++) {
    var button = delete_last_buttons[i];
    if(button.classList.contains("mdui-btn")) continue;
    decorate_button(button);
    button.innerHTML = "DELETE LAST";
  }
  var delete_all_buttons = $("button.json-editor-btntype-deleteall");
  for (var i = 0; i < delete_all_buttons.length; i++) {
    var button = delete_all_buttons[i];
    if(button.classList.contains("mdui-btn")) continue;
    decorate_button(button);
    button.innerHTML = "DELETE ALL";
  }
  var delete_buttons = $("button.json-editor-btntype-delete");
  for (var i = 0; i < delete_buttons.length; i++) {
    var button = delete_buttons[i];
    if(button.classList.contains("mdui-btn")) continue;
    decorate_button(button);
    button.classList.add("mdui-btn-icon");
    button.innerHTML = "";

    var i_element = document.createElement("i");
    i_element.classList.add("mdui-icon");
    i_element.classList.add("material-icons");
    i_element.innerHTML = "delete";
    button.appendChild(i_element);
  }
}

function apply_theme() {
  // header
  var header = $(".je-header")[0];
  if(!header.classList.contains("mdui-typo-display-1")) {
    header.classList.add("mdui-typo-display-1");
  }

  // var rows = $(".row");
  // for(var i = 0; i < rows.length; i++) {
  //   rows[i].classList.add("mdui-row");
  // }

  // text input with label
  var input_labels = $("label.je-form-input-label");
  for (var i = 0; i < input_labels.length; i++) {
    if(input_labels[i].classList.contains("mdui-textfield-label")) continue;
    input_labels[i].classList.add("mdui-textfield-label");
    var father = input_labels[i].parentNode;
    father.classList.add("mdui-textfield");
    var input = father.getElementsByTagName("input")[0];
    input.classList.add("mdui-textfield-input");
  }

  // text input without label
  var inputs = $("input");
  for (var i = 0; i < inputs.length; i++) {
    if(inputs[i].classList.contains("mdui-textfield-input")) continue;
    inputs[i].classList.add("mdui-textfield-input");
  }

  // checkbox
  var input_checkboxs = $("input.je-checkbox");
  for (var i = 0; i < input_checkboxs.length; i++) {
    var label = input_checkboxs[i].parentNode;
    if(label.classList.contains("mdui-switch")) continue;
    label.classList.add("mdui-switch");
    var i_element = document.createElement("i");
    i_element.classList.add("mdui-switch-icon");
    label.insertBefore(i_element, label.childNodes[1]);
  }

  // select
  var selects = $("select");
  for (var i = 0; i < selects.length; i++) {
    if(selects[i].classList.contains("mdui-select")) continue;
    selects[i].classList.add("mdui-select");
    selects[i].setAttribute("mdui-select", "");
    var options = selects[i].getElementsByTagName("option");
    for (var j = 0; j < options.length; j++) {
      if (options[j].value == "undefined") {
        options[j].remove();
      }
    }
  }

  // table
  var tables = $("table");
  for (var i = 0; i < tables.length; i++) {
    if(tables[i].classList.contains("mdui-table")) continue;
    tables[i].classList.remove("je-table");
    tables[i].classList.add("mdui-table");

    var father = tables[i].parentNode;
    father.classList.remove("je-indented-panel");
    father.classList.add("mdui-container");
    father.classList.add("ras-table-container");
  }

  // buttons
  decorate_buttons();

  mdui.mutation();
  mdui.updateTables();
}