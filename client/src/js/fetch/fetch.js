import "whatwg-fetch";

/**
 * Setting default request parameters when using fetch.
 * They can be easily overwritten by providing same
 * through props.
 * 
 * If there is a need for some kind of interceptors
 * then this would be the best place to do it.
 */

const defaultFetchHeaders = new Headers({
    "Content-Type": "application/json"
});

const defaultFetchProps = {
    headers: defaultFetchHeaders
};

fetch = (function (originalFetch) {
    return function (url, props) {
        const fetchProps = {
            ...defaultFetchProps,
            ...props
        };

        return originalFetch(url, fetchProps).then(
            (response) => {
                if (!response.ok) {
                    throw response;
                }

                return response;
            }
        );
    };
})(fetch);