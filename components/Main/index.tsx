import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addFile, deleteFile, getFiles, updateFile } from '../../services/member';

export default function Main() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  const getFilesAPI = useCallback(async () => {
    const value = await getFiles();

    const userFiles = value.data ? value.data : [];

    setFiles(userFiles);
  }, [getFiles]);

  useEffect(() => {
    getFilesAPI();
  }, []);

  const onAddFile = async () => {
    const data = { message };

    if (!message) {
      toast.error('Please input message');
    } else {
      await addFile(data).then((v) => {
        getFilesAPI();
      });
    }
  };

  const onDeleteFile = async (fileName) => {
    await deleteFile(fileName).then((v) => {
      getFilesAPI();
    });
  };

  const onUpdate = async (userFileId, fileContent, fileName) => {
    const link = document.getElementById(userFileId);
    const linkCopy = link;
    const aHref = link?.getAttribute('href');
    link.remove();
    document.getElementById(`bt-${userFileId}`).remove();
    const li = document.getElementById(`li-${userFileId}`);
    const inputForm = document.createElement('input');
    li.appendChild(inputForm);

    let attType = document.createAttribute('type');
    attType.value = 'text';
    inputForm.setAttributeNode(attType);
    let attValue = document.createAttribute('value');
    attValue.value = fileContent;
    inputForm.setAttributeNode(attValue);

    let btn = document.createElement('button');
    btn.innerHTML = 'Submit';
    btn.type = 'submit';
    btn.onclick = async function () {
      await updateFile({ content: inputForm.value, fileName }).then((v) => {
        inputForm.remove();
        btn.remove();
        const newLink = document.createElement('a');
        const text = document.createTextNode(fileName);
        newLink.appendChild(text);
        newLink.id = userFileId;
        newLink.target = '_blank';
        newLink.href = aHref;
        li?.prepend(newLink);

        let btnUpdate = document.createElement('button');
        btnUpdate.id = 'bt-' + userFileId;
        btnUpdate.innerHTML = 'Update';
        btnUpdate.type = 'button';
        btnUpdate.onclick = () => {
          onUpdate(userFileId, inputForm.value, fileName);
        };
        li.appendChild(btnUpdate);
      });
    };
    li.appendChild(btn);
  };

  const URL = process.env.NEXT_PUBLIC_URL;
  return (
    <>
      <div>
        <input
          type='text'
          id='fname'
          placeholder='Your message'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type='button' onClick={onAddFile}>
          Add Message
        </button>
      </div>
      <br />
      <div>
        File List:
        <ol>
          {files.map((userFile) => {
            return (
              <>
                <li key={userFile._id} id={`li-${userFile._id}`}>
                  <a
                    id={userFile._id}
                    href={`${URL}/${userFile.userId}/${userFile.fileName}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {userFile.fileName}
                  </a>
                  <button type='button' onClick={() => onDeleteFile(userFile.fileName)}>
                    Delete
                  </button>
                  <button
                    id={`bt-${userFile._id}`}
                    type='button'
                    onClick={() => onUpdate(userFile._id, userFile.content, userFile.fileName)}
                  >
                    Update
                  </button>
                </li>
              </>
            );
          })}
        </ol>
      </div>
    </>
  );
}
