import TestRenderer from 'react-test-renderer';

const tester = (createFunction) => {
    let onRender = [];
    let renderNum = 0;
    let values = {};

    const Tester = ({ value }) => {
        for(const handler of onRender)
            handler(value, renderNum);
        values[renderNum] = value;
        renderNum++;
        return null;
    };

    const renderer = TestRenderer.create(createFunction(Tester));

    let nextRenderNum = 0;
    const nextRender = () => {
        const thisRenderNum = nextRenderNum;
        nextRenderNum++;

        if(thisRenderNum < renderNum)
            return Promise.resolve(values[thisRenderNum]);

        return new Promise(resolve => {
            const handler = (value, renderNum) => {
                if(renderNum !== thisRenderNum)
                    return;
                resolve(value);
                onRender = onRender.filter(x => x !== handler);
            };
            onRender = [...onRender, handler];
        });
    };

    return {
        renderer,
        get state() {
            return values[nextRenderNum - 1];
        },
        nextRender
    };
};

export default tester;
