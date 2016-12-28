angular.module('et.style', []);
angular.module('et.style').directive('etstyle', etstyle);
angular.module('et.style').directive('fixed', fixed);
angular.module('et.style').directive('full', full);
angular.module('et.style').directive('canvas', canvas);
angular.module('et.style').directive('simple', simple);
angular.module('et.style').directive('ettabs', ettabs);
angular.module('et.style').directive('metisMenus', metisMenus);
angular.module('et.style').directive('pageTitle', pageTitle);
angular.module('et.style').directive('dialogUp', dialogUp);

function SmoothlyMenu() {
  if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
    // Hide menu in order to smoothly turn on when maximize menu
    $('#side-menu').hide();
    // For smoothly turn on menu
    setTimeout(
      function() {
        $('#side-menu').fadeIn(500);
      }, 100);
  } else if ($('body').hasClass('fixed-sidebar') || $('body').hasClass('canvas-menu')) {
    $('#side-menu').hide();
    setTimeout(
      function() {
        $('#side-menu').fadeIn(500);
      }, 300);
  } else {
    // Remove all inline style from jquery fadeIn function to reset menu state
    $('#side-menu').removeAttr('style');

  }
}

function etstyle() {
  return {
    restrict: 'C',
    link: function(scope, element) {
      $(window).bind("load resize", function() {
          if ($(this).width() < 769) {
            $('body').addClass('body-small')
          } else {
            $('body').removeClass('body-small')
          }
        })
        // Collapse ibox function
      $('.collapse-link').click(function() {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function() {
          ibox.resize();
          ibox.find('[id^=map-]').resize();
        }, 50);
      });
      // Close ibox function
      $('.close-link').click(function() {
        var content = $(this).closest('div.ibox');
        content.remove();
      });
      setTimeout(function() {
        $('.product-navbar-collapse').unbind("click");
        $('.product-navbar-collapse').click(function() {
          $("body").toggleClass("mini-navbar");
          SmoothlyMenu();
        });
      }, 200);
    }
  }
}

//metisMenu
function metisMenus() {
  return {
    restrict: 'C',
    link: function(scope, element) {
      element.metisMenu();
    }
  }
}
//fixed-sidebar
function fixed() {
  return {
    restrict: 'C',
    link: function(scope, element) {
      $('body').addClass('fixed-sidebar pace-done');
    }
  }
}

// Full height
function full() {
  return {
    restrict: 'C',
    link: function(scope, element) {
      function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();
        if (navbarHeigh > wrapperHeigh) {
          $('#page-wrapper').css("min-height", navbarHeigh + "px");
          $('.page-content').css("min-height", navbarHeigh - 100 + "px");
        }
        if (navbarHeigh < wrapperHeigh) {
          $('#page-wrapper').css("min-height", $(window).height() + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
          $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
        }
      }
      $('body').addClass('full-height pace-done');
      $(window).bind("load resize scroll", function() {
        if (!$("body").hasClass('body-small')) {
          fix_height();
        }
      });
      setTimeout(function() {
        fix_height();
      }, 200);
    }
  }

}

//canvas-menu
function canvas() {
  return {
    restrict: 'C',
    link: function(scope, element) {
      function fix_height() {
        var windowHeigh = $(window).height();
        var wrapperHeigh = $('#page-wrapper').height();
        var headerHeight = $('.header').height();
        var footerHeight = $('.footer').height();
        if (windowHeigh > wrapperHeigh) {
          $('#page-wrapper').css("min-height", windowHeigh + "px");
          $('.page-content').css("min-height", windowHeigh - headerHeight - footerHeight + "px");
        }
      }
      $('body').addClass('canvas-menu pace-done');
      $(window).bind("load resize scroll", function() {
        if (!$("body").hasClass('body-small')) {
          fix_height();
        }
      });
      setTimeout(function() {
        fix_height();
        // Close menu in canvas mode
        $('.close-canvas-menu').unbind('click');
        $('.close-canvas-menu').click(function() {
          $("body").toggleClass("mini-navbar");
          SmoothlyMenu();
        });
      }, 200);

    }
  }

}

//simple-layout
function simple() {
  return {
    restrict: 'C',
    link: function(scope, element) {
      $('body').addClass('simple-layout pace-done');
      $(window).bind("load resize scroll", function() {
        if (!$("body").hasClass('body-small')) {
          fix_height();
        }
      });
      setTimeout(function() {
        fix_height();
      }, 200);

      function fix_height() {
        var windowHeigh = $(window).height();
        var wrapperHeigh = $('#page-wrapper').height();
        var headerHeight = $('.header').height();
        var footerHeight = $('.footer').height();
        if (windowHeigh > wrapperHeigh) {
          $('#page-wrapper').css("min-height", windowHeigh + "px");
          $('.page-content').css("min-height", windowHeigh - headerHeight - footerHeight + "px");
        }
      }
    }
  }
}
//tabs
function ettabs() {
  return {
    restrict: 'C',
    link: function(scope, element) {
      $('.nav-tabs li', element).click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('.tab-content .tab-pane', element).eq($(this).index()).addClass('active').siblings().removeClass('active');
      });
    }
  }
}
//page-title
function pageTitle($rootScope) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      $rootScope.pageTitle = attrs.pageTitle;
    }
  }
}
//dialogUp
function dialogUp() {
  return {
    restrict: 'AE',
    scope: {
      btnname: '@',
      titlename: '@',
      btncolor: '@',
      boxwidth: '@',
      boxheight: '@'
    },
    templateUrl: "views/dialog.html",
    transclude: true,
    controller: function($scope) {
      $scope.close = function() {
        $scope.modalshowhide = false;
      }
      $scope.open = function() {
        $scope.modalshowhide = true;
      }
    },
    link: function(scope, element) {

    }
  }
}

