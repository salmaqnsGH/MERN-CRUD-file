import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addFile, getFiles } from '../../services/member';

export default function Main() {
  const [files, setFiles] = useState([]);
  const [idUser, setIdUser] = useState([]);

  const getFilesAPI = useCallback(async () => {
    const value = await getFiles();

    const userFiles = value.data ? value.data.userFiles : [];
    const _idUser = value.data ? value.data.account._id : [];
    // console.log(idUser);
    setIdUser(_idUser);
    setFiles(userFiles);
  }, [getFiles]);

  useEffect(() => {
    getFilesAPI();
  }, []);

  const [message, setMessage] = useState('');

  const onAddFile = async () => {
    const data = { message };
    // console.log('data', data);

    if (!message) {
      toast.error('Please inpput message');
    } else {
      await addFile(data).then((v) => {
        getFilesAPI();
      });
    }
  };

  const URL = process.env.NEXT_PUBLIC_URL;
  return (
    <>
      <div>
        <input
          type='message'
          className='form-control rounded-pill text-lg'
          placeholder='Your message'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type='button' onClick={onAddFile}>
          Add Message
        </button>
      </div>
      <br />
      File List:
      <ol>
        {files.map((userFile) => {
          return (
            <li key={userFile}>
              <a href={`${URL}/${idUser}/${userFile}`}>{userFile}</a>
            </li>
          );
        })}
      </ol>
    </>
  );
}
