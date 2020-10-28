//load data-------------
function loadData(){
	var url = "data/data.json";
	$.ajax({
		type: 'GET',
		url: url,
		cache: false,
		crossDomain: true,
		dataType: 'json',
		success: function(data) {
			rt_json = data.packages;
			for (var key_section in rt_json) {
				
				var danhmuc = rt_json[key_section].section;
					if(danhmuc==null) {
						danhmuc = "Unknown";
					}
					if(packagesSection[danhmuc] == null) {
						packagesSection[danhmuc] = [];
					}
				packagesSection[danhmuc].push(rt_json[key_section]);
			};

			setTimeout(function () {
				$('#loading').remove();
				loadSection();
				lastUpdate();
				$("#main").fadeIn(500);
			}, 300);
			
		},
		error: function() {
			$("#loading").append("<p style='color:red'>Error load json!</p>");
			$("#main").remove();
		},
	});
}

//load Section
var packagesSection = {};
function loadSection(){
	var sectionContent = "";
	for (var pk_section in packagesSection) {
		var total_section = packagesSection[pk_section].length;
		
		sectionContent += "<a onclick='allpackages(\""+pk_section+"\")' role='button'>";
		sectionContent += "<img src=' "+pk_section+".png ' class='icon'/>";
		sectionContent += "<label>"+pk_section+" ("+total_section+")</label>";
		sectionContent += "</a>";
	}
	$("#pkgs").hide().html(sectionContent).fadeIn(500);
}

//load packages Section
function allpackages(sectionName){
	var html_data = " ";
		// html_data += "<a onclick='loadSection()' role='button'>";
		// html_data += "<label>&#171; Back</label>";
		// html_data += "</a>";
	for ( var allPackages in packagesSection[sectionName] ) {
	var item = packagesSection[sectionName][allPackages];
	var urlOpen ="mota.html#" + item.name;

		html_data += "<a href='"+urlOpen+"' target='_blank' role='button'>";
		html_data += "<img src='"+item.icon+"' class='icon'>";
		html_data += "<div>";
		html_data += "<label>"+item.name+"</label>";
		html_data += "<p>"+item.shortdesc+"</p>";
		html_data += "</div>";
		html_data += "</a>";
	}
		html_data += "<a onclick='loadSection()' role='button'>";
		html_data += "<label>&#171; Back</label>";
		html_data += "</a>";
	$('#pkgs').hide().html(html_data).fadeIn(500);
}

//last Update
function lastUpdate(){
	var htmlnews = "";
	var count = 0;
	for (var last in rt_json) {
		count++;
		if(count > 10) {
			break;
		}
		var urlOpen ="mota.html#" + last;
		htmlnews += '<a href="'+urlOpen+'" target="_new">';
		htmlnews += '<img class="icon" src="'+ rt_json[last].icon +'">';
		htmlnews += '<div>';
		htmlnews += '<label>'+ rt_json[last].name +'</label>';
		htmlnews += '<p>'+ rt_json[last].shortdesc +'</p>';
		htmlnews += '</div>';
		htmlnews += '</a>';
	}
	$("#update").html(htmlnews);
}

//------------option2------------------

// function loadData(){
	// var today = new Date().getHours();
	// $.getJSON("data/data.json?v="+ today, function(data) {
		// var arrData = data.packages;
		// var rt_Html = "";
		// $.each(arrData, function(k, v) {
		// var mota = "mota.html#" + k;
		
		// rt_Html += '<a href="'+mota+'" target="_new">';
		// rt_Html += '<img class="icon" src="' +v.icon+ '">';
		// rt_Html += '<div>';
		// rt_Html += '<label>' +v.name+ '</label>';
		// rt_Html += '<p>' +v.shortdesc+ '</p>';
		// rt_Html += '</div>';
		// rt_Html += '</a>';

		// setTimeout(function () {
			// $('#loading').empty();
			// $('#pkgs').hide().html(rt_Html).fadeIn(300);
			// }, 300);

		// });
	
	// });

// };
