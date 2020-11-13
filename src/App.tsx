import React, { useState } from 'react';
import './App.css';
import * as sethealth from '@sethealth/react';
import { SetProgressBar, SetViewVolumetric } from '@sethealth/react';

function App() {
  const [workspace, setWorkspace] = useState<sethealth.WorkspaceState>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<number>();

  return (
    <div className="App">
      {loading === undefined && (
        <button onClick={async () => {
          const result = await sethealth.med.loadFromSource({
            type: 'nrrd',
            input: "https://public1-eu-sethealth.ams3.cdn.digitaloceanspaces.com/public/ankle.nrrd.gz"
          }, (progress) => setLoading(progress));
          if (result.error) {
            setError(result.error);
          } else {
            const handler = result.value[0];
            const workspace = await sethealth.workspace.create(handler);
            setWorkspace(workspace);
          }
        }}>
          Load medical image
        </button>
      )}

      {loading !== undefined && loading < 1.0 && (
        <SetProgressBar value={loading}/>
      )}

      {error && (
        <div>
          Loading failed
          {error}
        </div>
      )}

      {workspace && (
        <SetViewVolumetric
          workspace={workspace}
        />
      )}
    </div>
  );
}

export default App;
