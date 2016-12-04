import httpApi from 'libs/common/middleware/api_http'
import exception_handler from 'libs/common/middleware/exception_handler'

import errCodeMap from '../constants/error_code_map'


export default [
    httpApi,
    exception_handler(errCodeMap)
]