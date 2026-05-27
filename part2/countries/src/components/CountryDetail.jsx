import WeatherDetail from "./WeatherDetail";

const CountryDetail = ({ country }) => {

	const flagStyle = {
		border: '3px solid lightgrey'
	};

	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>
				Capital: {country.capital.join(", ")}
			</p>
			<p>
				Area: {country.area}
			</p>

			<h2>Languages</h2>
			<ul>
				{Object.values(country.languages)
					.map(lang => <li key={lang}>{lang}</li>)}
			</ul>

			<img 
				src={country.flags.png} 
				alt={country.flags.alt}
				width="200px"
				style={flagStyle}
			/>
			
			<WeatherDetail country={country} />
		</div>
	);
};

export default CountryDetail;
