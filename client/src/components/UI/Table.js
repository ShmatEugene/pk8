import React from 'react';

const Table = (props) => {
  const tableHead = ['num', 'first name', 'second name', 'email', 'number', 'desc'];
  const tableData = [
    [
      751,
      'Samir',
      'Joseey',
      'JGalligan@id.net',
      '(741)558-4349',
      'suspendisse magna at sed sagittis sit turpis at tortor hendrerit',
    ],
    [
      751,
      'Samir',
      'Joseey',
      'JGalligan@id.net',
      '(741)558-4349',
      'suspendisse magna at sed sagittis sit turpis at tortor hendrerit',
    ],
  ];
  function renderTableHead(columnNames) {
    return columnNames.map((columnName, index) => <td key={index}>{columnName}</td>);
  }
  function renderTableBody(tableData) {
    return tableData.map((row, rowIndex) => (
      <tr>
        {row.map((td, tdIndex) => (
          <td key={rowIndex + '' + tdIndex}>{td}</td>
        ))}
      </tr>
    ));
  }
  return (
    <table className="table post__table">
      <thead>
        <tr>{renderTableHead(tableHead)}</tr>
      </thead>
      <tbody>{renderTableBody(tableData)}</tbody>
    </table>
  );
};

export default Table;
