$(function() {

	if (localStorage['boot'] === undefined) {
		$('input.site').each(function(index) {
			localStorage[$(this).attr('id')] = true;
		});
		localStorage['boot'] = true;
	}

	for (var i in localStorage) {
		$('#' + i).prop('checked', localStorage[i] == 'true' ? true : false);
	}

	

	$('input.site').on('click', function() {
		localStorage[$(this).attr('id')] = $(this)[0].checked;
	});
	

	$("form#query").submit(function(e) {
		e.preventDefault();
		var sites = {
			'aliexpress': {
				'url': 'https://www.aliexpress.com/wholesale?SearchText=',
				'kargo': '&isFreeShip=y',
				'ucuz': '&SortType=price_asc'
			},
			'amazon': {
				'url': 'https://www.amazon.com.tr/s?k=',
				'kargo': '',
				'ucuz': '&s=price-asc-rank'
			},
			'hepsiburada': {
				'url': 'https://www.hepsiburada.com/ara?q=',
				'kargo': '',
				'ucuz': '&siralama=artanfiyat'
			},
			'gittigidiyor': {
				'url': 'https://www.gittigidiyor.com/arama/?k=',
				'kargo': '&krg=1',
				'ucuz': '&sra=hpa'
			},
			'n11': {
				'url': 'https://www.n11.com/arama?q=',
				'kargo': '&isf=1',
				'ucuz': '&srt=PRICE_LOW'
			},
			'pttavm': {
				'url': 'https://www.pttavm.com/arama?q=',
				'kargo': '',
				'ucuz': '&order=price_asc'
			}
		}
		var query = $('input#queryString').val().trim();
		if (!query.length) {
			return;
		}
		query = encodeURIComponent(query);
		var kargo = localStorage['kargo'] == 'true' ? true : false;
		var ucuz = localStorage['ucuz'] == 'true' ? true : false;

		for (var site in sites) {
			if (localStorage[site] == 'true') {
				var final_url = sites[site].url + query;
				if (kargo) final_url = final_url + sites[site].kargo;
				if (ucuz) final_url = final_url + sites[site].ucuz;
				window.open(final_url, '_blank');
			}
		}
	});
});