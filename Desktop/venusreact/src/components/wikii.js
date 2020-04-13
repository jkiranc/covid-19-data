import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';

function DBPedia(props) {
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState('')
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        const { steps } = props;
        const search = steps.search.value;
        const endpoint = encodeURI('https://dbpedia.org');
        const query = encodeURI(`
      select * where {
      ?x rdfs:label "${search}"@en .
      ?x rdfs:comment ?comment .
      FILTER (lang(?comment) = 'en')
      } LIMIT 100
    `);

        const queryUrl = `https://dbpedia.org/sparql/?default-graph-uri=${endpoint}&query=${query}&format=json`;

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', readyStateChange);

        function readyStateChange() {
            if (this.readyState === 4) {
                const data = JSON.parse(this.responseText);
                const bindings = data.results.bindings;
                if (bindings && bindings.length > 0) {
                    setLoading(false);
                    setResult(bindings[0].comment.value);
                } else {
                    setLoading(false);
                    setResult('Not found.');
                }
            }
        }

        xhr.open('GET', queryUrl);
        xhr.send();
    })

    // function triggetNext() {
    //     console.log('im clicked')
    //     setTrigger(true)
    // }
    function triggetNext() {
        setTrigger(true)
        props.triggerNextStep();
      }
    console.log(loading, result, trigger)

    return (
        <div className="dbpedia">
            {loading ? <Loading /> : result}
            {
                !loading &&
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 20,
                    }}
                >
                    {
                        !trigger &&
                        <button
                            onClick={triggetNext}
                        >
                            Search Again
              </button>
                    }
                </div>
            }
        </div>
    );
}

DBPedia.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};

const ExampleDBPedia = () => (
    <ChatBot
        steps={[
            {
                id: '1',
                message: 'Type something to search on Wikipédia. (Ex.: Brazil)',
                trigger: 'search',
            },
            {
                id: 'search',
                user: true,
                trigger: '3',
            },
            {
                id: '3',
                component: <DBPedia />,
                waitAction: true,
                trigger: '1',
            },
            {
              id: '4',
              component: (<div>Iquit i dont get nex flow</div>),
              waitAction: true,
              trigger: '1',
            },
        ]}
    />
);

export default ExampleDBPedia;