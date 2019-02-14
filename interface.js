function escapeHtml(text) {
 var map = {
   '&': '&amp;',
   '<': '&lt;',
   '>': '&gt;',
   '"': '&quot;',
   "'": '&#039;'
 };

 return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function log(promptTxt, information) {
  information = escapeHtml(information).replace(/\s/g, "\u00a0");
  $(".stream").append('<div class="line">' +
     '<p class="prompt">' + escapeHtml(promptTxt)+ '</p>' +
     '<p class="information">' + information + '</p>' +
     '</div>');
  $(document).scrollTop($(document).height() - $(window).height());
}

$(document).ready(function(e) {
   console.clear();
   var previouscommands = [];
   var currentcommand = 0;

   $(".editline .edit").keydown(function(e) {
      var promptTxt = $(".editline .prompt").text()
      var text = $(".editline .edit").text();
      //console.log(e.which);
      if (e.which == 13) {
         $(".editline .edit").text("");
         log(promptTxt, text);
         e.preventDefault();
         //text = text.replace("\u00A0", " ").replace("\u00A0", " "); // hard spaces to soft spaces
         text = text.replace(/\s/g, " ");
         var finished = interactivePython(text);
         console.log(finished);
         if (finished) {
             //$(".editline .prompt").text("&gt;&gt;&gt;");
             $(".editline .prompt").text(">>>");
         } else {
             $(".editline .prompt").text("...");
         }

         previouscommands[currentcommand] = text;
         currentcommand = previouscommands.length;
      }
      if (e.which == 38) { //up
         if (currentcommand > 0) {
            currentcommand--;
            $(".editline .edit").text(previouscommands[currentcommand]);
         }
      }
      if (e.which == 40) { //down

         if (currentcommand < previouscommands.length) {
            currentcommand++;
            $(".editline .edit").text(previouscommands[currentcommand]);
         }
      }
   });


   String.prototype.splice = function(idx, rem, str) {
      return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
   };

   log(" ", "NPython 0.1.0 JS target");
   $(".editline").show();
});
