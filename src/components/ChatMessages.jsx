import Markdown from 'react-markdown';
import useAutoScroll from '../hooks/useAutoScroll';
import Spinner from './Spinner';
import userIcon from '../assets/images/user.svg';
import errorIcon from '../assets/images/error.svg';

import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(isLoading);
  
  return (
    <div ref={scrollContentRef} className='grow space-y-4'>
      {messages.map(({ role, content, loading, error }, idx) => (
        <div key={idx} className={`flex items-start gap-4 py-4 px-3 rounded-xl ${role === 'user' ? 'bg-primary-blue/10' : ''}`}>
          {role === 'user' && (
            // <img
            //   className='h-[26px] w-[26px] shrink-0'
            //   src={userIcon}
            //   alt='user'
            // />
            <Alert icon={
                <img
                  className='h-[26px] w-[26px] shrink-0'
                  style={{
                    'height': '26px', 
                    'width': '26px'
                  }}
                  src={userIcon}
                  alt='user'
                />
              } 
              severity="success">
              {content}
            </Alert>
          )}
          {(loading && !content) && (<LinearProgress aria-label="Loading…" />)}
          {/* <div>
            <div className='markdown-container'>
              {(loading && !content) ? <Spinner />
                : (role === 'assistant')
                  ? <Markdown>{content}</Markdown>
                  : <div className='whitespace-pre-line'>{content}</div>
              }
            </div>
            {error && (
              <div className={`flex items-center gap-1 text-sm text-error-red ${content && 'mt-2'}`}>
                <img className='h-5 w-5' src={errorIcon} alt='error' />
                <span>Error generating the response</span>
              </div>
            )}
          </div> */}
          {role === 'assistant' && (
            <>
            <Markdown>{content}</Markdown>
            </>
          )}
          {error && (
            // <div className={`flex items-center gap-1 text-sm text-error-red ${content && 'mt-2'}`}>
            //   <img className='h-5 w-5' src={errorIcon} alt='error' />
            //   <span>Error generating the response</span>
            // </div>
            <Alert severity="error">Error generating the response</Alert>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;