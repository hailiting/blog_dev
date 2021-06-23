console.log($);
$(function(argument) {
  $("#btn").click(function(event) {
    var exampleInputText = $("#exampleInputText").val();
    var exampleInputPassword = $("#exampleInputPassword").val();
    event.preventDefault();
    $.ajax({
      url: "/receive",
      type: "get",
      dateType: "json",
      data: {
        username: exampleInputText,
        password: exampleInputPassword,
      },
      success: function(date) {
        alert("提交成功");
      },
      error: function() {
        alert("提交失败");
      },
    });
  });
});
