# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: client_server.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x13\x63lient_server.proto\"6\n\x0b\x44\x61taRequest\x12\x12\n\nmodel_name\x18\x01 \x01(\t\x12\x13\n\x0bwebhook_url\x18\x02 \x01(\t\"!\n\x0c\x44\x61taResponse\x12\x11\n\tjson_data\x18\x01 \x01(\t26\n\x04\x44\x61ta\x12.\n\x0fSendWebhookData\x12\x0c.DataRequest\x1a\r.DataResponseb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'client_server_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _DATAREQUEST._serialized_start=23
  _DATAREQUEST._serialized_end=77
  _DATARESPONSE._serialized_start=79
  _DATARESPONSE._serialized_end=112
  _DATA._serialized_start=114
  _DATA._serialized_end=168
# @@protoc_insertion_point(module_scope)
