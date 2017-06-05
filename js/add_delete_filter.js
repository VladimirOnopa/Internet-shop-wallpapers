$(document).ready(function () {
    function Obj (id , brand , color , assignment , format , basis , modeproduction , docking , drawingelement , size , favorite) {
        this.id = id;
        this.brand = brand;
        this.color = color;
        this.assignment = assignment;
        this.format = format;
        this.basis = basis;
        this.modeproduction = modeproduction;
        this.docking = docking;
        this.drawingelement = drawingelement;
        this.size = size;
        this.favorite = favorite;
    }

    var obj_1 = new Obj("01" , "Versailles" , "Brown" , "LivingRoom" , "0,53x10,05" , "Flizelin" , "FoamedVinyl" , "0" , "AbstractionAndGeometry" , "Big" , false);
    var obj_2 = new Obj("02" , "Status" , "LightBrown" , "LivingRoom" , "0,06x25,00" , "Flizelin" , "FoamedVinyl" , "0" , "AbstractionAndGeometry" , "Small" , false);
    var obj_3 = new Obj("03" , "Status" , "Brown" , "LivingRoom" , "0,53x10,05" , "Vinyl" , "FoamedVinyl" , "0" , "AbstractionAndGeometry" , "Big" , false);
    var obj_4 = new Obj("04" , "Versailles" , "White" , "LivingRoom" , "0,06x25,00" , "Paper" , "FoamedVinyl" , "0" , "Floristics" , "Small" , false);
    var obj_5 = new Obj("05" , "Status" , "White" , "LivingRoom" , "0,53x10,05" , "Flizelin" , "FoamedVinyl" , "0" , "AbstractionAndGeometry" , "Small" , false);
    var obj_6 = new Obj("06" , "Versailles" , "Brown" , "LivingRoom" , "0,53x10,05" , "Vinyl" , "FoamedVinyl" , "0" , "AbstractionAndGeometry" , "Small" , false);
    var obj_7 = new Obj("07" , "Versailles" , "Red" , "LivingRoom" , "0,53x10,05" , "Flizelin" , "FoamedVinyl" , "0" , "AbstractionAndGeometry" , "Big" , false);
    var obj_8 = new Obj("08" , "Versailles" , "Brown" , "Lobby" , "0,53x10,05" , "Paper" , "FoamedVinyl" , "0" , "AbstractionAndGeometry" , "Small" , false);
    var obj_9 = new Obj("09" , "Versailles" , "LightBrown" , "Kitchen" , "0,53x10,05" , "Paper" , "FoamedVinyl" , "0" , "AbstractionAndGeometry" , "Small" , false);
    var obj_10 = new Obj("10" , "Versailles" , "Gray" , "Lobby" , "0,53x10,05" , "Flizelin" , "FoamedVinyl" , "0" , "AbstractionAndGeometry" , "Small" , false);

    var arrOfObj = [obj_1,obj_2,obj_3,obj_4,obj_5,obj_6,obj_7,obj_8,obj_9,obj_10];
    var activeFilterArr = [];
    var listNameArr = [];

    function wallpaperFiltering() {
        var counter = 0;
        for (var u = 0; u < activeFilterArr.length; u++) {
            for (var i = 0; i < arrOfObj.length; i++) {
                for (var key in arrOfObj[i]) {
                    if (activeFilterArr[u] == arrOfObj[i][key]) {
                        var result = arrOfObj[i].id;
                        counter++;
                        document.getElementById(result).style.display = "block";
                    } else if (activeFilterArr[u] != arrOfObj[i][key]) {
                        continue;
                    }
                }
            }
            // If are no matches with the selected filters, remove ads and display a message
            if (counter > 0) {
                $(".found_wp").css("display", "none");
            }
            if (counter == 0) {
                if ($("#wp_product_container>div").hasClass("found_wp")) {
                    counter = 1;
                }
                var div = document.createElement("div");
                $(div).addClass("found_wp");
                $("#wp_product_container").prepend(div);
                $(".advt_1").css("display", "none");
                $("#load_more_items").css("display", "none");
            }
        }
    }


///////Show result filter container//////


    function showResultFilterContainer() {
        if (activeFilterArr.length <= 0) {
            $("#result_filter").css("display", "none");
        } else {
            $("#result_filter").css("display", "block");
        }
    }
    showResultFilterContainer();


/////Adds a pressed filter to the active list//////


    $(function(){
        $(".filters").click(function(event) {
            var targetClick = event.target;
            filterName = targetClick.innerHTML ;
            var filterDataName = targetClick.dataset.brand || targetClick.dataset.color || targetClick.dataset.assignment || targetClick.dataset.format || targetClick.dataset.basis || targetClick.dataset.modeproduction || targetClick.dataset.docking || targetClick.dataset.drawingelement || targetClick.dataset.size;
            for (var i = 0 ; i < activeFilterArr.length ; i++) {
                if (activeFilterArr[i] == filterDataName || listNameArr[i] == filterName) {
                    return false;
                }
            }
            $(".wp_box").css("display", "none");
            activeFilterArr.push(filterDataName);
            listNameArr.push($(filterName).text() || filterName); // $(filterName).text() Adding an array without tags to the colors
            var li = document.createElement('li');
            var div = document.createElement('div');
            var p = document.createElement('p');
            var accessToUl =  document.querySelector("#result_filter>ul");
            accessToUl.appendChild(li);
            div.className = "close_icon";
            var accessToLastLi  = document.querySelector("#result_filter>ul>:last-child");
            accessToLastLi.appendChild(div);
            accessToLastLi.appendChild(p);
            var innerText = document.querySelector("#result_filter>ul>:last-child>p");
            innerText.innerHTML= filterName;
            wallpaperFiltering();
            showBtnDelAllFilter();
            showResultFilterContainer();
        });
    });


/////////Remove the filter by pressing the delete button///////


    $(document).on("click", ".close_icon", function(event) {
        var targetClick = event.target;
        var $nameOFTargetClick = $(targetClick).siblings().text();
        var $liForRemove = $(targetClick).parent();

        for (var i = 0; i < activeFilterArr.length; i++) {
            if ($nameOFTargetClick == listNameArr[i]) {
                activeFilterArr.splice(i, 1);
                listNameArr.splice(i, 1);
                $($liForRemove).addClass("delete_filter_anim");
                setTimeout(function() {$($liForRemove).remove();}, 300);
            } else {
                continue;
            }
        }
        if (activeFilterArr.length == 0) {
            $(".wp_box").css("display", "block");
        } else {
            $(".wp_box").css("display", "none");
            wallpaperFiltering();
        }
        //  If  matches, remove the message block, display the ads block and the "load button"
        $(".found_wp").css("display", "none");
        $(".advt_1").css("display", "block");
        $("#load_more_items").css("display", "block");
        showBtnDelAllFilter();
        showResultFilterContainer();
    });



////////Add to favorite///////


    $(document).on("click", ".wp_favorite_icon", function(event) {
        var targetClick = event.target;
        var $parent = $(targetClick).parent();
        var $parentOfParent = $($parent).parent();
        var $parentId = $($parentOfParent).parent().attr("id");
        var favoriteCounter = document.querySelector("#favorite_icon>p");
        $(targetClick).css("transform", "scale(0.8,0.8)");
        setTimeout(function() {$(targetClick).css("transform", "scale(1,1)");}, 70);

        for (var i = 0; i < arrOfObj.length; i++) {
            if ($parentId == arrOfObj[i].id) {
                if (arrOfObj[i].favorite === false) {
                    arrOfObj[i].favorite = true;
                    $(targetClick)
                        .css("opacity", "0")
                        .addClass("wp_favorite_icon_active")
                        .css("opacity", "1");
                    if (favoriteCounter.innerHTML === "0") {
                        favoriteCounter.innerHTML = 1;
                    } else {
                        favoriteCounter.innerHTML = +favoriteCounter.innerHTML + 1;
                    }
                    break;
                } else if (arrOfObj[i].favorite === true) {
                    arrOfObj[i].favorite = false;
                    $(targetClick).removeClass("wp_favorite_icon_active");
                    $(targetClick).css("opacity", "1");
                    favoriteCounter.innerHTML = +favoriteCounter.innerHTML - 1;
                }
            }
        }
    });



////// Load more wallpapers//////


    $(document).on( "click" , "#load_more_items",function() {
        $(".wp_box").clone([true]).appendTo("#wp_product_container");
    });


//////Adding the class "active" to the side menu//////


    $(document).on( "click" , "#menu>a",function() {
        $("#menu>a").removeClass("active_bnt");
        $(this).addClass("active_bnt");
    });


///////Show button "Delete all filters"//////


    function showBtnDelAllFilter() {
        if (activeFilterArr.length >= 2) {
            if ($("#result_filter>div").hasClass("deleteAllFilters")) {
                $(".deleteAllFilters").remove();
            }
            var div = document.createElement("div");
            var span = document.createElement("span");
            $(span).text("Сбросить все");
            $(div).addClass("deleteAllFilters");
            $("#result_filter").append(div);
            $(".deleteAllFilters").prepend(span);
        } else {
            $(".deleteAllFilters").css("display", "none");
            return false;
        }
    }


/////// Button "Delete all filters"//////


    $(document).on("click", ".deleteAllFilters", function deleteAllFilters() {
        activeFilterArr.length = 0;
        listNameArr.length = 0;
        $(".wp_box").css("display", "block");
        $("#result_filter>ul>li").remove();
        $(".deleteAllFilters").remove();
        showResultFilterContainer();
    });



});
