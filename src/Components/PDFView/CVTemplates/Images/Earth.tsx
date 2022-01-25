import { G, Path, Svg } from '@react-pdf/renderer';

const Earth = (props: { width?: number; height?: number }) => {
  const { width, height } = props;
  return (
    <Svg viewBox='0 0 82.51 82.51' width={width} height={height}>
      <G>
        <Path
          fill='white'
          d='M42.551,0.033C42.298,0.019,42.047,0,41.792,0c-0.066,0-0.132,0.008-0.198,0.009C41.481,0.008,41.369,0,41.255,0
		C18.507,0,0,18.507,0,41.254C0,64.003,18.507,82.51,41.255,82.51S82.51,64.003,82.51,41.254C82.51,18.942,64.7,0.721,42.551,0.033z
		 M41.902,76.464c-0.037,0.001-0.072,0.006-0.109,0.006s-0.073-0.005-0.109-0.006H41.902z M38.254,75.688
		c-4.167-1.849-7.83-6.869-10.326-13.708c3.254-0.796,6.729-1.313,10.326-1.518V75.688z M38.254,54.457
		c-4.179,0.221-8.233,0.83-12.038,1.786c-0.884-3.708-1.453-7.755-1.639-11.988h13.677V54.457z M24.575,38.255
		c0.203-4.68,0.877-9.13,1.924-13.15c3.716,0.91,7.672,1.482,11.755,1.694v11.456H24.575z M38.254,20.789
		c-3.418-0.201-6.751-0.687-9.894-1.431c2.477-6.258,5.96-10.832,9.894-12.576V20.789z M44.254,26.852
		c4.453-0.162,8.78-0.76,12.829-1.754c1.048,4.022,1.723,8.474,1.926,13.157H44.254V26.852z M44.254,20.845V6.38
		c4.378,1.337,8.278,6.167,10.979,13.005C51.776,20.2,48.074,20.695,44.254,20.845z M56.943,9.695
		c3.135,1.565,6.003,3.583,8.523,5.968c-1.401,0.731-2.896,1.391-4.467,1.978C59.85,14.679,58.486,12.01,56.943,9.695z
		 M22.59,17.628c-1.837-0.683-3.559-1.468-5.152-2.339c2.848-2.614,6.125-4.762,9.712-6.334C25.4,11.43,23.863,14.349,22.59,17.628z
		 M20.733,23.35c-1.207,4.544-1.957,9.571-2.162,14.904H6.137c0.584-6.893,3.156-13.225,7.145-18.421
		C15.547,21.19,18.05,22.365,20.733,23.35z M18.572,44.255c0.191,4.896,0.843,9.528,1.885,13.769
		c-2.839,1.061-5.461,2.335-7.808,3.8c-3.627-5.03-5.959-11.048-6.512-17.568L18.572,44.255L18.572,44.255z M22.187,63.763
		c1.357,3.746,3.049,7.057,5.007,9.813c-3.964-1.731-7.549-4.169-10.597-7.156C18.301,65.419,20.181,64.534,22.187,63.763z
		 M44.254,76.09V60.406c3.966,0.16,7.813,0.702,11.399,1.582C52.945,69.405,48.862,74.681,44.254,76.09z M44.254,54.396V44.255
		h14.753c-0.186,4.222-0.752,8.258-1.632,11.957C53.259,55.182,48.842,54.559,44.254,54.396z M65.013,44.255h11.36
		c-0.535,6.32-2.742,12.169-6.181,17.104c-2.158-1.287-4.523-2.411-7.059-3.36C64.172,53.763,64.821,49.139,65.013,44.255z
		 M65.014,38.255c-0.206-5.334-0.955-10.361-2.162-14.906c2.395-0.879,4.643-1.912,6.708-3.086
		c3.802,5.113,6.245,11.289,6.813,17.992H65.014z M56.903,72.836c1.741-2.601,3.256-5.653,4.493-9.067
		c1.743,0.669,3.387,1.428,4.904,2.271C63.576,68.791,60.403,71.093,56.903,72.836z'
        />
      </G>
    </Svg>
  );
};

export default Earth;
