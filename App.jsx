import { useEffect, useState } from "react";
import { healthCheck } from "./api.js";
import "./App.css";

const STATUS = {
  CHECKING: "checking",
  OK: "ok",
  FAIL: "fail",
};

export default function App() {
  const [status, setStatus] = useState(STATUS.CHECKING);
  const [data, setData] = useState(null);

  useEffect(() => {
    healthCheck()
      .then((res) => {
        setData(res);
        setStatus(STATUS.OK);
      })
      .catch(() => {
        setStatus(STATUS.FAIL);
      });
  }, []);

  const dotClass =
    status === STATUS.OK
      ? "status-dot dot-ok"
      : status === STATUS.FAIL
      ? "status-dot dot-fail"
      : "status-dot dot-checking";

  const statusText =
    status === STATUS.OK
      ? "Backend Connected"
      : status === STATUS.FAIL
      ? "Backend Offline"
      : "Connecting to AN-RA Backend…";

  return (
    <div className="app">
      <div className="status-box">
        <div className="app-name">AN·RA</div>
        <div className="app-tagline">Workspace</div>

        <div className="status-label">System Status</div>

        <div className="status-row">
          <span className={dotClass} />
          <span className="status-text">{statusText}</span>
        </div>

        {status === STATUS.OK && data && (
          <div className="status-meta">
            <div>
              service&nbsp;&nbsp;<span>{data.service}</span>
            </div>
            <div>
              phase&nbsp;&nbsp;&nbsp;&nbsp;<span>{data.phase}</span>
            </div>
            <div>
              status&nbsp;&nbsp;&nbsp;<span>{data.status}</span>
            </div>
          </div>
        )}

        {status === STATUS.FAIL && (
          <div className="status-hint">
            Start the FastAPI server on port 8000:
            <br />
            <br />
            <code>uvicorn app:app --reload --port 8000</code>
          </div>
        )}
      </div>
    </div>
  );
}
