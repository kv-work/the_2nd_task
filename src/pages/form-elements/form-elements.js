//Loading styles
import '../../main.scss'
import './form-elements.scss'

//Loading scripts




function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('../../components', true, /\.(js)$/));