import { Oval } from 'react-loader-spinner'

export const LoadingSpinnerPromiseComponent = () => {
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
					wrapperClass="loader-component"
					/>
				}
			</div>
	)
};