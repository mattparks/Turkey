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
  new Page(1, "./html/1people.html", "1people", "People and cleavages"),
  new Page(2, "./html/2government.html", "2government", "Government and institutions"),
  new Page(3, "./html/3history.html", "3history", "History and change"),
  new Page(4, "./html/4rights.html", "4rights", "Civil rights and liberties"),
  new Page(5, "./html/5legitimacy.html", "5legitimacy", "Government legitimacy"),
  new Page(6, "./html/6civil.html", "6civil", "Civil rights, liberties, and youth"),
  new Page(7, "./html/7parties.html", "7parties", "Parties and elections"),
  new Page(8, "./html/8domestic.html", "8domestic", "Domestic policy + HDI, Gini"),
  new Page(9, "./html/9economics.html", "9economics", "Economic system / change"),
  new Page(10, "./html/10foreign.html", "10foreign", "Foreign policy / US"),
  new Page(11, "./html/11media.html", "11media", "Public optinion / media"),
  new Page(12, "./html/12events.html", "12events", "Current events"),
  new Page(13, "./html/13future.html", "13future", "Future / Questions"),
  new Page(14, "./html/footer.html", "footer", "Footer"),
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
