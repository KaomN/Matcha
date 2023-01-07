import { Oval } from 'react-loader-spinner'
import ProfilePassword from '../containers/ProfileComponents/PrivateComponents/ProfilePassword';

export const LoadingSpinnerComponent = (props) => {
	return (
			<div>
				{
					<Oval
					height={props.size}
					width={props.size}
					color="var(--color-primary)"
					secondaryColor="darkslategray"
					visible={true}
					ariaLabel='oval-loading'
					strokeWidth={6}
					strokeWidthSecondary={2}
					wrapperClass={props.class}
					/>
				}
			</div>
	)
};