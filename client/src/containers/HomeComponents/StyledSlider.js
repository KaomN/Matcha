import ReactSlider from 'react-slider'
import styled from 'styled-components';

const StyledSlider = styled(ReactSlider)`
width: 100%;
height: 18px;
`;

const StyledThumb = styled.div`
height: 18px;
line-height: 18px;
width: 18px;
text-align: center;
font-size: 10px;
background-color: #243d3d;
color: #fff;
border-radius: 50%;
cursor: pointer;
`;

const StyledTrack = styled.div`
top: 0;
bottom: 0;
background: ${props => (props.index === 2 ? 'darkslategray' : props.index === 1 ? '#009579' : 'darkslategray')};
border-radius: 1000px;
border: 2px solid var(--color-primary-darker);
`;

export default function StyledSliderComponent(props) {
	const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>
	const Track = (props, state) => <StyledTrack {...props} index={state.index} />

	return (
		<StyledSlider
		{...props}
		renderTrack={Track}
		renderThumb={Thumb}
		/>
	);
}