//Code Part 1 only serial Name --------------------

$("#tBut1").click(function(){
			var SerialName = $("#S_Name1").val();
			SerialName = SerialName.trim();
			var Data_Response,encoded_SerialName,yql1,yql2,yql3,encoded_url1,encode_url2,encode_url3,base_url1,base_url2,base_url3,base_url4;
					if (SerialName == "")
						alert('Enter Serial Name');				
			encoded_SerialName = encodeURIComponent(SerialName);
			yql1 = "select * from xml where url ='http://services.tvrage.com/feeds/full_search.php?show="+encoded_SerialName+"'";
			encoded_url1 = encodeURIComponent(yql1);
			base_url1 = "http://query.yahooapis.com/v1/public/yql?q="+ encoded_url1 +"&diagnostics=true";
			//console.log(base_url1);
			var i = 0;
			var tvRage_Title = new Array();
			var tempTitle,tempDate,imdbID,tvRage_id;
			var tvRage_link = new Array();
			var tvRage_showID = new Array();
			var tvRage_started = new Array();
			var tvRage_ended = new Array();
			var tvRage_seasons = new Array();
			var tvRage_status = new Array();
			//var tvRage_genres = new Array();
			var tvRage_airtime = new Array();
			var tvRage_airday = new Array();
			var tvDb_name = new Array();
			var tvDb_started = new Array();
			var tvDb_imdbID = new Array();
				$.get(base_url1,function(data){
					var count =$(data).find('Results').children().length;
					//console.log(count);
					//alert(count);
					if(count > 0 ){
						$("#parent").show('fast');
						$("#parent1").show('fast');
						$('#error').hide('fast');
					$(data).find('Results').find('show').each(function() 
						{
							tvRage_showID[i] = $(this).find("showid").text();
							tvRage_Title[i] = $(this).find("name").text();
							console.log(tvRage_Title[i]);
							tvRage_link[i] = $(this).find("link").text();
							tvRage_started[i] = $(this).find("started").text();
							tvRage_ended[i] = $(this).find("ended").text();
							tvRage_seasons[i] = $(this).find("seasons").text();
							tvRage_status[i] = $(this).find("status").text();
							//tvRage_genres[i] = $(this).find("genres").text();
							tvRage_airtime[i] = $(this).find("airtime").text();
							tvRage_airday[i] = $(this).find("airday").text();
							//console.log(tvRage_Title[i] + "---"+tvRage_started[i]);
							i = i + 1;
						});
					
					for(i = 0; i < tvRage_Title.length; i++ ){
							var temp = tvRage_Title[i].split('(')[0];
							temp = temp.trim();
							//console.log(temp+'----test');
							//console.log(temp[1]+'----test'+temp[0]+'-------test');
							if(temp.toLowerCase() == SerialName.toLowerCase()){
								tempTitle = temp;
								//imdbTitle = temp;
								tempDate = tvRage_started[i];
								//console.log(tempDate);
								tvRage_id = tvRage_showID[i];
								$("#main").hide("fast");
								$('#title').html("<b>Title: </b>&nbsp;&nbsp;"+tvRage_Title[i]+"");
								$('#realeaseDate').html("<b>Start Date: </b>&nbsp;&nbsp;"+tvRage_started[i]+"");
								//$('#genre').html("<b>Genre:  </b>&nbsp;&nbsp; "+tvRage_genres[i]+" ");
								$('#seasons').html("<b>Number of Seasons:  </b>&nbsp;&nbsp;"+tvRage_seasons[i]+" ");
								$('#air').html("<b>Air Time:  </b>&nbsp;&nbsp;"+tvRage_airtime[i]+" - "+tvRage_airday[i]+"");
								$('#link').html("<b>Link:  </b>&nbsp;&nbsp;<a href='"+tvRage_link[i]+"' target='blank'>"+tempTitle+"</a>");
								break;
							}
					}
					yql2 = "select * from xml where url = 'http://services.tvrage.com/feeds/episodeinfo.php?sid="+tvRage_id+"'";
					encoded_url2 = encodeURIComponent(yql2);
					base_url2 = "http://query.yahooapis.com/v1/public/yql?q="+ encoded_url2 +"&diagnostics=true";
				
				$.get(base_url2 ,function(data){
					$(data).find('results').find('show').each(function(){
					$('#next').show('fast');
								$('#latest').html("<table><th>Latest Episode</th><tr><td>Episode Title:</td><td>"+($(this).find("latestepisode").find("title").text())+"</td></tr><tr><td>Episode Number:</td><td>"+($(this).find("latestepisode").find("number").text())+"</td></tr><tr><td>Airdate:</td><td>"+($(this).find("latestepisode").find("airdate").text())+"</td></tr></table>");
								$('#next').html("<table><th>Next Episode</th><tr><td>Episode Title:</td><td>"+($(this).find(+"nextepisode").find("title").text())+"</td></tr><tr><td>Episode Number:</td><td>"+($(this).find("nextepisode").find("number").text())+"</td></tr><tr><td>Airdate:</td><td>"+($(this).find("nextepisode").find("airdate").text())+"</td></tr></table>");
						});
				
				yql3 = "select * from xml where url ='http://www.thetvdb.com/api/GetSeries.php?seriesname="+encoded_SerialName+"'";
				encoded_url3 = encodeURIComponent(yql3);
				base_url4 = "http://query.yahooapis.com/v1/public/yql?q="+ encoded_url3 +"&diagnostics=true";
				//console.log(base_url4);
				i = 0;
				$.get(base_url4,function(data){
					$(data).find('Data').find('Series').each(function(){
							tvDb_name[i] = $(this).find("SeriesName").text();
							console.log(tvDb_name[i]);
							tvDb_started[i] = $(this).find("FirstAired").text();
							tvDb_imdbID[i] = $(this).find("IMDB_ID").text();
							//console.log("tvdb: "+tvDb_name[i]+ "----"+tvDb_started[i]);
							i = i + 1;	
					});
				
				
				for(i = 0; i < tvDb_name.length; i++){
					var temp = tvDb_name[i].split('(')[0];
					temp = temp.trim();
					var temp2 =  tvDb_started[i].substring(0,4);
					if(tempDate !=null)
						tempDate = tempDate.substring(tempDate.length-4,tempDate.length);
					//console.log(tempDate);
					if(temp.toLowerCase() == SerialName.toLowerCase() && temp2 == tempDate){
						imdbID = tvDb_imdbID[i];
					}
				}	
				if(tempDate != null && imdbID != null){
						base_url3 = "http://www.omdbapi.com/?i="+imdbID+"";						
				$.getJSON(base_url3,function(data){
				if(data.Response == 'True'){
					$('#rating').html("<b>IMDB Raiting:  </b>&nbsp;&nbsp;"+data.imdbRating+" ");
					$('#cast').html("<b>Cast:  </b>&nbsp;&nbsp;"+data.Actors+"");
					$('#genre').html("<b>Genre:  </b>&nbsp;&nbsp;"+data.Genre+"");
					if(data.Poster != 'N/A')
						$('#poster').html("<img src ="+data.Poster+" height = '275' width = '175'></img>");
					else
					$('#poster').html("<img src ='no_photo.jpeg'  height = '70' width ='70'></img>");
					}else{
					$('#poster').html("<img src ='no_photo.jpeg' height = '70' width ='70'></img>");}
				});}
				else{
					//console.log('1');
					$('#error').html('<b>*Error In Entry</b>');
					$('#error').show('slow');
					$('#parent').hide('fast');
					$('#parent1').hide('fast');
				} 
				});
			});
		}else{
			//console.log('2');
			$('#error').html('<b>*Error In Entry or connection problems</b>');
			$('#error').show('slow');
			$('#parent').hide('fast');
			$('#parent1').hide('fast');
		}
		});				
	});
	
	
	
//Code Part 2 both serial Name and Year--------------------

$("#tBut2").click(function(){
			var SerialName = $("#S_Name2").val();
			var Year = $("#S_Year2").val();
			SerialName = SerialName.trim();
			Year = Year.trim();
			var Data_Response,encoded_SerialName,yql1,yql2,yql3,encoded_url1,encode_url2,encode_url3,base_url1,base_url2,base_url3,base_url4;
					if (SerialName == "")
						alert('Enter Serial Name');		
			encoded_SerialName = encodeURIComponent(SerialName);
			yql1 = "select * from xml where url ='http://services.tvrage.com/feeds/full_search.php?show="+encoded_SerialName+"'";
			encoded_url1 = encodeURIComponent(yql1);
			base_url1 = "http://query.yahooapis.com/v1/public/yql?q="+ encoded_url1 +"&diagnostics=true";
			var i = 0;
			var tvRage_Title = new Array();
			var tempTitle,tempDate,imdbID,tvRage_id;
			var tvRage_link = new Array();
			var tvRage_showID = new Array();
			var tvRage_showID = new Array();
			var tvRage_started = new Array();
			var tvRage_ended = new Array();
			var tvRage_seasons = new Array();
			var tvRage_status = new Array();
			//var tvRage_genres = new Array();
			var tvRage_airtime = new Array();
			var tvRage_airday = new Array();
			var tvDb_name = new Array();
			var tvDb_started = new Array();
			var tvDb_imdbID = new Array();
				$.get(base_url1,function(data){
					var count  = $(data).find('Results').children().length;
					if(count > 0){
						$("#parent").show('fast');
						$("#parent1").show('fast');
						$('#error').hide('fast');
					$(data).find('Results').find('show').each(function() 
						{
							tvRage_showID[i] = $(this).find("showid").text();
							tvRage_Title[i] = $(this).find("name").text();
							tvRage_link[i] = $(this).find("link").text();
							tvRage_started[i] = $(this).find("started").text();
							tvRage_ended[i] = $(this).find("ended").text();
							tvRage_seasons[i] = $(this).find("seasons").text();
							tvRage_status[i] = $(this).find("status").text();
							//tvRage_genres[i] = $(this).find("genres").text();
							tvRage_airtime[i] = $(this).find("airtime").text();
							tvRage_airday[i] = $(this).find("airday").text();
							//console.log(tvRage_Title[i]);
							i = i + 1;
						});
					
					for(i = 0; i < tvRage_Title.length; i++ ){
							var temp = tvRage_Title[i].split('(', 2);
							temp[0] = temp[0].trim();
							tempDate = tvRage_started[i];
							tempDate = tempDate.substring(tempDate.length-4,tempDate.length);
							//console.log(tempDate+'-----');
							if(temp[0].toLowerCase() == SerialName.toLowerCase() && tempDate == Year){
								tempTitle = temp[0];
								imdbTitle = temp[0];
								tvRage_id = tvRage_showID[i];
								$("#main").hide("fast");
								$('#title').html("<b>Title:  </b>&nbsp;&nbsp;"+tvRage_Title[i]+"");
								$('#realeaseDate').html("<b>Start Date:  </b>&nbsp;&nbsp;"+tvRage_started[i]+"");
								//$('#genre').html("<b>Genre:  </b>&nbsp;&nbsp;"+tvRage_genres[i]+" ");
								$('#seasons').html("<b>Number of Seasons:  </b>&nbsp;&nbsp;"+tvRage_seasons[i]+" ");
								$('#air').html("<b>Air Time:  </b>&nbsp;&nbsp;"+tvRage_airtime[i]+" - "+tvRage_airday[i]+"");
								$('#link').html("<b>Link:  </b>&nbsp;&nbsp;<a href='"+tvRage_link[i]+"' target='blank'>"+tempTitle+"</a>");
								break;
							}
					}
					
					yql2 = "select * from xml where url = 'http://services.tvrage.com/feeds/episodeinfo.php?sid="+tvRage_id+"'";
					encoded_url2 = encodeURIComponent(yql2);
					base_url2 = "http://query.yahooapis.com/v1/public/yql?q="+ encoded_url2 +"&diagnostics=true";
				
				$.get(base_url2 ,function(data){
					$(data).find('results').find('show').each(function(){
								$('#next').show('fast');
								tempDate = ($(this).find("started").text());
								tempDate = tempDate.substring(0,4);	
								//console.log(tempDate+'inside');
								if(tempDate == Year){
								$('#latest').html("<table><th>Latest Episode</th><tr><td>Episode Title:</td><td>"+($(this).find("latestepisode").find("title").text())+"</td></tr><tr><td>Episode Number:</td><td>"+($(this).find("latestepisode").find("number").text())+"</td></tr><tr><td>Airdate:</td><td>"+($(this).find("latestepisode").find("airdate").text())+"</td></tr></table>");
								$('#next').html("<table><th>Next Episode</th><tr><td>Episode Title:</td><td>"+($(this).find("nextepisode").find("title").text())+"</td></tr><tr><td>Episode Number:</td><td>"+($(this).find("nextepisode").find("number").text())+"</td></tr><tr><td>Airdate:</td><td>"+($(this).find("nextepisode").find("airdate").text())+"</td></tr></table>");}
						});				
				
				yql3 = "select * from xml where url ='http://www.thetvdb.com/api/GetSeries.php?seriesname="+encoded_SerialName+"'";
				encoded_url3 = encodeURIComponent(yql3);
				base_url4 = "http://query.yahooapis.com/v1/public/yql?q="+ encoded_url3 +"&diagnostics=true";
				//console.log(base_url4);
				i = 0;
				$.get(base_url4,function(data){
					$(data).find('Data').find('Series').each(function(){
							tvDb_name[i] = $(this).find("SeriesName").text();
							tvDb_started[i] = $(this).find("FirstAired").text();
							tvDb_imdbID[i] = $(this).find("IMDB_ID").text();
							i = i + 1;	
					});
				
				for(i = 0; i < tvDb_name.length; i++){
					var temp = tvDb_name[i].split('(')[0];
					temp = temp.trim();
					var temp2 =  tvDb_started[i].substring(0,4);
					tempDate = tempDate.substring(tempDate.length-4,tempDate.length);
					//console.log(tempDate);
					if(temp.toLowerCase() == SerialName.toLowerCase() && temp2 == Year){
						imdbID = tvDb_imdbID[i];
						//console.log(imdbID);
					}
				}				
				if(tempDate != null && imdbID !=null){
					base_url3 = "http://www.omdbapi.com/?i="+imdbID+"";						
					$.getJSON(base_url3,function(data){
				if(data.Response == 'True'){
					$('#rating').html("<b>IMDB Raiting:  </b>&nbsp;&nbsp;"+data.imdbRating+" ");
					$('#cast').html("<b>Cast:  </b>&nbsp;&nbsp;"+data.Actors+"");
					$('#genre').html("<b>Genres:  </b>&nbsp;&nbsp;"+data.Genre+"");
					if(data.Poster != 'N/A')
						$('#poster').html("<img src ="+data.Poster+" height = '310'></img>");
					else
					$('#poster').html("<img src ='no_photo.jpeg'  height = '70' width ='70'></img>");
					}else{
					$('#poster').html("<img src ='no_photo.jpeg' height = '70' width ='70'></img>");}
				});
				}else{
					$('#error').html('<b>*Error In Entry</b>');
					$('#error').show('slow');
					$('#parent').hide('fast');
					$('#parent1').hide('fast');
				}
			});
			});
		}else{
			$('#error').html('<b>*Error In Entry or connection problems</b>');
			$('#error').show('slow');
			$('#parent').hide('fast');
			$('#parent1').hide('fast');
		}});				
	});
	
	
//Code Part 3 Serial Name, Year and Particular Season Episode --------------------

$("#tBut3").click(function(){
			var SerialName = $("#S_Name3").val();
			var Year = $("#S_Year3").val();
			var Season_Number = $("#S_Season3").val();
			var Episode_Number = $("#S_Episode3").val();
			Episode_Number = Episode_Number.trim();
			Season_Number = Season_Number.trim();
			SerialName = SerialName.trim();
			Year = Year.trim();
			var Data_Response,encoded_SerialName,yql1,yql2,yql3,encoded_url1,encode_url2,encode_url3,base_url1,base_url2,base_url3,base_url4;
					if (SerialName == "")
						alert('Enter Serial Name');			
			encoded_SerialName = encodeURIComponent(SerialName);
			yql1 = "select * from xml where url ='http://services.tvrage.com/feeds/full_search.php?show="+encoded_SerialName+"'";
			encoded_url1 = encodeURIComponent(yql1);
			base_url1 = "http://query.yahooapis.com/v1/public/yql?q="+ encoded_url1 +"&diagnostics=true";
			var i = 0;
			var tvRage_Title = new Array();
			var tempTitle,tempDate,imdbID,tvRage_id;
			var tvRage_link = new Array();
			var tvRage_showID = new Array();
			var tvRage_started = new Array();
			var tvRage_ended = new Array();
			var tvRage_seasons = new Array();
			var tvRage_status = new Array();
			//var tvRage_genres = new Array();
			var tvRage_airtime = new Array();
			var tvRage_airday = new Array();
			var tvDb_name = new Array();
			var tvDb_started = new Array();
			var tvDb_imdbID = new Array();
				$.get(base_url1,function(data){
					var count = $(data).find('Results').children().length;
					if(count>0){
						$("#parent").show('fast');
						$("#parent1").show('fast');
						$('#error').hide('fast');
					$(data).find('Results').find('show').each(function() 
						{
							tvRage_showID[i] = $(this).find("showid").text();
							tvRage_Title[i] = $(this).find("name").text();
							tvRage_link[i] = $(this).find("link").text();
							tvRage_started[i] = $(this).find("started").text();
							tvRage_ended[i] = $(this).find("ended").text();
							tvRage_seasons[i] = $(this).find("seasons").text();
							tvRage_status[i] = $(this).find("status").text();
							//tvRage_genres[i] = $(this).find("genres").text();
							tvRage_airtime[i] = $(this).find("airtime").text();
							tvRage_airday[i] = $(this).find("airday").text();
							//console.log(tvRage_Title[i]);
							i = i + 1;
						});
					
					for(i = 0; i < tvRage_Title.length; i++ ){
							var temp = tvRage_Title[i].split('(', 2);

							temp[0] = temp[0].trim();
							tempDate = tvRage_started[i];
							tempDate = tempDate.substring(tempDate.length-4,tempDate.length);	
							
							if(Year == ""){
								if(temp[0].toLowerCase() == SerialName.toLowerCase()){
									tempTitle = temp[0];
									tvRage_id = tvRage_showID[i];
									Year = tempDate;
									$("#main").hide("fast");
									$('#title').html("<b>Title:  </b>&nbsp;&nbsp;"+tvRage_Title[i]+"");
									$('#realeaseDate').html("<b>Start Date:  </b>&nbsp;&nbsp;"+tvRage_started[i]+"");
									//$('#genre').html("<b>Genre:  </b>&nbsp;&nbsp;"+tvRage_genres[i]+" ");
									$('#seasons').html("<b>Number of Seasons:  </b>&nbsp;&nbsp;"+tvRage_seasons[i]+" ");
									$('#air').html("<b>Air Time:  </b>&nbsp;&nbsp;"+tvRage_airtime[i]+" - "+tvRage_airday[i]+"");
									$('#link').html("<b>Link:  </b>&nbsp;&nbsp;<a href='"+tvRage_link[i]+"' target='blank'>"+tempTitle+"</a>");
									break;
								}
							}
							else{
								if(temp[0].toLowerCase() == SerialName.toLowerCase() && tempDate == Year){
									imdbTitle = temp[0];
									tvRage_id = tvRage_showID[i];
									$("#main").hide("fast");
									$('#title').html("<b>Title:  </b>&nbsp;&nbsp;"+tvRage_Title[i]+"");
									$('#realeaseDate').html("<b>Start Date:  </b>&nbsp;&nbsp;"+tvRage_started[i]+"");
									//$('#genre').html("<b>Genre:  </b>&nbsp;&nbsp;"+tvRage_genres[i]+" ");
									$('#seasons').html("<b>Number of Seasons:  </b>&nbsp;&nbsp;"+tvRage_seasons[i]+" ");
									$('#air').html("<b>Air Time:  </b>&nbsp;&nbsp;"+tvRage_airtime[i]+" on every "+tvRage_airday[i]+"");
									$('#link').html("<b>Link:  </b>&nbsp;&nbsp;<a href='"+tvRage_link[i]+"' target='blank'>"+tempTitle+"</a>");
									break;
							}
						}
					}
					
					yql2 = "select * from xml where url = 'http://services.tvrage.com/feeds/episodeinfo.php?sid="+tvRage_id+"&exact=1&ep="+Season_Number+"x"+Episode_Number+"'";
					encoded_url2 = encodeURIComponent(yql2);
					base_url2 = "http://query.yahooapis.com/v1/public/yql?q="+ encoded_url2 +"&diagnostics=true";
					//console.log(imdbTitle);
				
				$.get(base_url2 ,function(data){
					$(data).find('results').find('show').each(function(){
								tempDate = ($(this).find("started").text());
								tempDate = tempDate.substring(0,4);
								$('#next').hide('fast');
								if(tempDate == Year)
								$('#latest').html("<table><th>Episode</th><tr><td>Episode Title:</td><td>"+($(this).find("episode").find("title").text())+"</td></tr><tr><td>Episode Number:</td><td>"+($(this).find("episode").find("number").text())+"</td></tr><tr><td>Airdate:</td><td>"+($(this).find("episode").find("airdate").text())+"</td></tr></table>");
						});	

				yql3 = "select * from xml where url ='http://www.thetvdb.com/api/GetSeries.php?seriesname="+encoded_SerialName+"'";
				encoded_url3 = encodeURIComponent(yql3);
				base_url4 = "http://query.yahooapis.com/v1/public/yql?q="+ encoded_url3 +"&diagnostics=true";
				//console.log(base_url4);
				i = 0;
				$.get(base_url4,function(data){
					$(data).find('Data').find('Series').each(function(){
							tvDb_name[i] = $(this).find("SeriesName").text();
							tvDb_started[i] = $(this).find("FirstAired").text();
							tvDb_imdbID[i] = $(this).find("IMDB_ID").text();
							i = i + 1;	
					});
				
				for(i = 0; i < tvDb_name.length; i++){
					var temp = tvDb_name[i].split('(')[0];
					temp = temp.trim();
					var temp2 =  tvDb_started[i].substring(0,4);
					tempDate = tempDate.substring(tempDate.length-4,tempDate.length);
					//console.log(tempDate);
					if(temp.toLowerCase() == SerialName.toLowerCase() && temp2 == Year){
						imdbID = tvDb_imdbID[i];
						//console.log(imdbID);
					}
				}	
				if(tempDate != null && imdbID !=null){
				base_url3 = "http://www.omdbapi.com/?i="+imdbID+"";						
				$.getJSON(base_url3,function(data){
				if(data.Response == 'True'){
					$('#rating').html("<b>IMDB Raiting:  </b>&nbsp;&nbsp;"+data.imdbRating+" ");
					$('#cast').html("<b>Cast:  </b>&nbsp;&nbsp;"+data.Actors+"");
					$('#genre').html("<b>Genre:  </b>&nbsp;&nbsp;"+data.Genre+"");
					if(data.Poster != 'N/A')
						$('#poster').html("<img src ="+data.Poster+" height = '310'></img>");
					else
					$('#poster').html("<img src ='no_photo.jpeg'  height = '70' width ='70'></img>");
					}else{
					$('#poster').html("<img src ='no_photo.jpeg' height = '70' width ='70'></img>");}
				});
				}else{
					$('#error').html('<b>*Error In Entry</b>');
					$('#error').show('slow');
					$('#parent').hide('fast');
					$('#parent1').hide('fast');
				}
			});
		});
		}else{
			$('#error').html('<b>*Error In Entry or connection problems</b>');
			$('#error').show('slow');
			$('#parent').hide('fast');
			$('#parent1').hide('fast');
		}
		});				
	});
