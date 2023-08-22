import "./loading.scss";

export default function Loading() {
  return (
    <div className="lds-loading">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
