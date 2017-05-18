function Page(id, path, element, name) {
  this.id = id;
  this.path = path;
  this.element = element;
  this.name = name;
  this.visible = false;
  this.divHeight = 0;
  this.progressInto = 0;
}

var pages = [
  new Page(0, "./html/header.html", "header", "Header"),
  new Page(2, "./html/footer.html", "footer", "Footer"),
];
var pagesHeight = 0;

$(document).ready(function() {
  loadNext(0);
});

function loadNext(i) {
  console.log("[" + i + "]: " + " loading " + pages[i].element + " page!");

  $.get(pages[i].path, function (data) {
    // Load page content
    $("#main").append(data);
    // $("#" + pages[i].element).css("left", i % 2 ? "-100%" : "200%");

    // Navagation
    var ul = document.getElementById("navlist");
    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode(pages[i].name);
    a.appendChild(linkText);
    a.onclick = function () {
      toggleNav();

      setTimeout(function() {
        scrollTo(pages[i]);
      }, 500);
    };
    li.appendChild(a);
    ul.appendChild(li);

    // Register next page, or end.
    var nextI = i + 1;

    if (nextI < pages.length) {
      loadNext(nextI);
    } else {
      completeLoad();
    }
  });
}

function completeLoad() {
  $("body").append('<script src="./js/style.js"></script>');
  $("body").append('<script src="./js/prism.js"></script>');
  updatePages();
}

$(window).resize(function() {
  updatePages();
});

$(window).on('scroll', function() {
  updatePages();
});

$(".openNav").click(function() {
  toggleNav();
});

function toggleNav() {
  $("body").toggleClass("navOpen");
  $("nav").toggleClass("open");
  $(".wrapper").toggleClass("open");
  $(this).toggleClass("open");
}

function updatePages() {
  var pageBottom = $(document).scrollTop() + $(window).height();
  pagesHeight = 0;

  for (var i = 0; i < pages.length; i++) {
    pages[i].divHeight = $("#" + pages[i].element).height();
    pages[i].progressInto = pageBottom - pagesHeight;

    if (!pages[i].visible && pages[i].progressInto >= 0) {
      reveal(pages[i]);
    }

    pagesHeight += pages[i].divHeight;
  }
}

function scrollTo(object) {
  var target = "#" + object.element;
  var $target = $(target);

  if (!object.visible) {
    reveal(object);
  }

  $('html, body').stop().animate({
    'scrollTop': $target.offset().top
  }, 900, 'swing', function () {
    window.location.hash = target;
  });
}

function reveal(object) {
  console.log("Activating " + object.element);
  object.visible = true;

//  $("#" + object.element).animate({
//    left: "0",
//  }, 1000, function() {
//  });
}
