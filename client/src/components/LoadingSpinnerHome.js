import { Oval } from 'react-loader-spinner'

export const LoadingSpinnerHome = () => {
	return (
			<div>
				{
					<Oval
					height={28}
					width={28}
					color="var(--color-primary)"
					secondaryColor="darkslategray"
					visible={true}
					ariaLabel='oval-loading'
					strokeWidth={6}
					strokeWidthSecondary={2}
					wrapperClass="home_loader_component"
					/>
				}
			</div>
	)
};