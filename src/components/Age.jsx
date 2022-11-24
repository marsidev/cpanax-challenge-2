import classNames from 'classnames'

export const Age = ({ age }) => {
	return <span className={classNames({
		'text-green-500': age <= 25,
		'text-yellow-500': age > 25 && age <= 45,
		'text-orange-500': age > 45 && age <= 65,
		'text-pink-500': age > 65
	})}>
		{age}
	</span>
}
