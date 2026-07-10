// SPDX-License-Identifier: SEE LiCENSE IN LICENSE
pragma solidity ^0.8.25;
contract SchoolMappingList {
  mapping(address=>address) _nextStudents;
  uint public listSize;
  address constant GUARD = address(1);

  constructor(){
    _nextStudents[GUARD] = GUARD;
    listSize = 1;
  }
  function addStudent(address student) public {
    require(!isStudent(student), "Student already in list");
    _nextStudents[student] = _nextStudents[GUARD];
    _nextStudents[GUARD] = _nextStudents[student];
    listSize++;
  }
  function removeStudent(address student, address preStudent) public {
    require(isStudent(student));
    require(_nextStudents[preStudent] == student);
    _nextStudents[preStudent] = _nextStudents[student];
    _nextStudents[student] = address(0);
    listSize--;
  }
  function removeStudent2(address student) public {
    require(isStudent(student));
    address preStudent = _getPrevStudent(student);
    _nextStudents[preStudent] = _nextStudents[student];
    _nextStudents[student] = address(0);
    listSize--;
  }
  function _getPrevStudent(address student) internal view returns (address) {
    address currentStudent = GUARD;
    while(_nextStudents[currentStudent] != GUARD) {
        if(_nextStudents[currentStudent] == student) {
          return currentStudent;
        }
        currentStudent = _nextStudents[currentStudent];
    }
    return address(0);
  }
  function isStudent(address student) public view returns (bool) {
    // 如果student的下一个学生不是GUARD，则说明student在列表中
    return _nextStudents[student] != address(0);
  }
}
