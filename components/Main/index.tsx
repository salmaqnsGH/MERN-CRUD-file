import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addFile, deleteFile, getFiles } from '../../services/member';

export default function Main() {
  const [files, setFiles] = useState([]);
  const [idUser, setIdUser] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState('');

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

  const onAddFile = async () => {
    const data = { message };
    // console.log('data', data);

    if (!message) {
      toast.error('Please input message');
    } else {
      await addFile(data).then((v) => {
        getFilesAPI();
      });
    }
  };

  const onDeleteFile = async (userFile) => {
    await deleteFile(userFile).then((v) => {
      getFilesAPI();
    });
  };

  const URL = process.env.NEXT_PUBLIC_URL;
  return (
    <>
      <div>
        <label htmlFor='fname'>First Name</label>
        <input
          type='text'
          id='fname'
          placeholder='Your message'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type='button' className='button' onClick={onAddFile}>
          Add Message
        </button>
      </div>
      <br />
      <div>
        File List:
        <ol>
          {files.map((userFile) => {
            return (
              <li key={userFile}>
                <a href={`${URL}/${idUser}/${userFile}`}>{userFile}</a>
                <button type='button' onClick={() => onDeleteFile(userFile)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
