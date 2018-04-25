import * as types from './mutation-types'

const mutations = {

	[types.TIME_CREATED](state, payload){
		state.timeCreated = payload
	}
}

export default mutations