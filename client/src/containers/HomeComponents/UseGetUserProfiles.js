import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UseGetUserProfiles(profileLimit, setUserProfiles, setHasMore, userProfiles) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	function removeNonUniqueUserId(res, userProfiles) {
		if (userProfiles.length > 0) {
			for (let i = 0; i < userProfiles.length; i++) {
				for (let j = 0; j < res.data.length; j++) {
					if (userProfiles[i].userid === res.data[j].userid) {
						res.data.splice(j, 1)
					}
				}
			}
		}
	}

		useEffect(() => {
		setLoading(true)
		setError(false)
		let cancel
			axios({
				method: 'GET',
				url: '/home/getusers/',
				params: { min: profileLimit.min, max: profileLimit.max },
				cancelToken: new axios.CancelToken(c => cancel = c)
			}).then(res => {
				setUserProfiles(prevUserProfiles => {
					removeNonUniqueUserId(res, prevUserProfiles)
					return [...new Set([...prevUserProfiles, ...res.data])]
				})
			setHasMore(res.data.length > 4)
			setLoading(false)
			}).catch(e => {
				if (axios.isCancel(e)) return
				setError(true)
			})
		return () => cancel()
	}, [profileLimit, setUserProfiles, setHasMore, setLoading, setError])

	return { loading, error, setLoading, setError }
}