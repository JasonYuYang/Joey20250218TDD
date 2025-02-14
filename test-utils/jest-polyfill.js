//jest.fn()
const fn = (impl = () => {
}) => {
    const mockFn = (...args) => {
        return impl(...args);
    }
    //TGoHaveBeenCallWith
    mockFn.mock = {calls: []}
    //Mock
    mockFn.mockImplementation = newImpl => (imp = newImpl)
    return mockFn;
}

const spyOn = (obj, prop) => {
    const originalValue = obj[prop];
    obj[prop] = fn()
    obj[prop].mockRestore = () => {
        obj[prop] = originalValue;
    }
}

``