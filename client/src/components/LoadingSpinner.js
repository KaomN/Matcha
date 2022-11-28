import { Oval } from 'react-loader-spinner'

export const LoadingSpinner = () => {
	return (
				<div>
					{
						<Oval
						height={80}
						width={80}
						color="var(--color-primary)"
						secondaryColor="darkslategray"
						visible={true}
						ariaLabel='oval-loading'
						strokeWidth={6}
						strokeWidthSecondary={2}
						wrapperClass="loader"
						/>
					}
				</div>
	)
};